# Vehicle Care OS (VCO) Database Schema Draft

## Overview

This schema is derived from the MVP PRD, sitemap, and user stories. It is designed for an initial relational database and assumes a web-first product with role-based access.

The goal is to support:
- customers and staff
- vehicles and service history
- bookings and technician workflow
- memberships
- payments
- reporting-ready operational data

## Core Design Principles

- treat `vehicle` as a first-class entity
- treat `booking` as the main operational object
- separate authentication identity from business profile data
- make status transitions auditable
- keep the MVP schema normalized enough for reliability, but simple enough to ship quickly

## Entity List

Core entities:
- users
- roles
- user_roles
- customers
- operators
- technicians
- locations
- vehicles
- service_packages
- service_add_ons
- booking_add_ons
- bookings
- booking_status_events
- technician_assignments
- membership_plans
- membership_subscriptions
- payments
- refunds
- checklist_templates
- checklist_template_items
- checklist_results
- checklist_result_items
- job_notes
- media_assets
- notifications

## 1. Identity and Access

### users
Purpose:
- authentication identity for all user types

Fields:
- id
- email
- phone
- password_hash
- auth_provider
- is_active
- last_login_at
- created_at
- updated_at

Notes:
- supports customer, operator, and technician accounts
- email or phone can be nullable depending on auth strategy, but at least one should exist

### roles
Purpose:
- define access roles

Fields:
- id
- key
- name
- created_at

Seed values:
- customer
- operator
- technician
- admin

### user_roles
Purpose:
- many-to-many mapping between users and roles

Fields:
- id
- user_id
- role_id
- location_id nullable
- created_at

Notes:
- location-specific role assignments are useful for operators and technicians

## 2. User Profiles

### customers
Purpose:
- customer business profile

Fields:
- id
- user_id
- first_name
- last_name
- preferred_contact_method
- default_vehicle_id nullable
- marketing_opt_in
- created_at
- updated_at

### operators
Purpose:
- operator business profile

Fields:
- id
- user_id
- display_name
- primary_location_id nullable
- created_at
- updated_at

### technicians
Purpose:
- technician business profile

Fields:
- id
- user_id
- display_name
- primary_location_id nullable
- status
- created_at
- updated_at

Suggested technician status values:
- active
- inactive
- on_shift
- off_shift

## 3. Business Structure

### locations
Purpose:
- physical service sites or service hubs

Fields:
- id
- name
- slug
- type
- address_line_1
- address_line_2 nullable
- city
- state_region
- postal_code
- country
- phone nullable
- is_active
- created_at
- updated_at

Suggested location type values:
- fixed_site
- mobile_hub

## 4. Customer Vehicles

### vehicles
Purpose:
- store customer vehicles and attach service history

Fields:
- id
- customer_id
- make
- model
- year
- color
- plate_number
- vin nullable
- nickname nullable
- is_default
- notes nullable
- created_at
- updated_at

Indexes:
- customer_id
- plate_number

Notes:
- plate number should be searchable
- one customer can have many vehicles

## 5. Service Catalog

### service_packages
Purpose:
- bookable packages such as exterior wash or premium detail

Fields:
- id
- location_id nullable
- name
- slug
- description
- price_amount
- currency
- estimated_duration_minutes
- is_active
- created_at
- updated_at

Notes:
- nullable `location_id` can support global packages or location-specific ones depending on implementation choice

### service_add_ons
Purpose:
- optional extras attached to a booking

Fields:
- id
- location_id nullable
- name
- description nullable
- price_amount
- currency
- estimated_duration_minutes nullable
- is_active
- created_at
- updated_at

### booking_add_ons
Purpose:
- pivot table for add-ons selected on a booking

Fields:
- id
- booking_id
- add_on_id
- price_amount
- created_at

Notes:
- price is copied at booking time to preserve historical accuracy

## 6. Bookings and Operations

### bookings
Purpose:
- central operational record for each appointment

Fields:
- id
- customer_id
- vehicle_id
- service_package_id
- location_id
- booking_channel
- service_mode
- scheduled_start_at
- scheduled_end_at
- actual_start_at nullable
- actual_end_at nullable
- status
- subtotal_amount
- total_amount
- currency
- payment_status
- membership_subscription_id nullable
- customer_notes nullable
- internal_notes nullable
- canceled_reason nullable
- created_by_user_id nullable
- created_at
- updated_at

Suggested booking channel values:
- customer_portal
- operator_manual

Suggested service mode values:
- on_site
- mobile

Suggested booking status values:
- pending
- confirmed
- assigned
- in_progress
- ready
- completed
- canceled
- no_show

Suggested payment status values:
- unpaid
- pending
- paid
- refunded
- failed

Indexes:
- customer_id
- vehicle_id
- location_id
- status
- scheduled_start_at

### booking_status_events
Purpose:
- audit log of booking status changes

Fields:
- id
- booking_id
- from_status nullable
- to_status
- changed_by_user_id nullable
- note nullable
- created_at

### technician_assignments
Purpose:
- assign or reassign technicians to bookings

Fields:
- id
- booking_id
- technician_id
- assigned_by_user_id nullable
- assigned_at
- unassigned_at nullable
- is_active

Notes:
- preserves assignment history even if reassigned

## 7. Memberships

### membership_plans
Purpose:
- recurring plans offered to customers

Fields:
- id
- location_id nullable
- name
- description
- billing_interval
- price_amount
- currency
- benefits_summary nullable
- is_active
- created_at
- updated_at

Suggested billing interval values:
- monthly
- yearly

### membership_subscriptions
Purpose:
- customer enrollment in membership plan

Fields:
- id
- membership_plan_id
- customer_id
- vehicle_id nullable
- status
- started_at
- current_period_start_at
- current_period_end_at
- canceled_at nullable
- paused_at nullable
- external_subscription_ref nullable
- created_at
- updated_at

Suggested status values:
- trialing
- active
- paused
- canceled
- expired

Notes:
- keep `vehicle_id` nullable until product decides if memberships are customer-level or vehicle-level

## 8. Payments

### payments
Purpose:
- payment attempts and successful charges

Fields:
- id
- booking_id nullable
- membership_subscription_id nullable
- provider
- provider_payment_ref nullable
- amount
- currency
- status
- payment_method_type nullable
- paid_at nullable
- failed_at nullable
- failure_reason nullable
- created_at
- updated_at

Suggested status values:
- pending
- succeeded
- failed
- refunded

### refunds
Purpose:
- refund records tied to payments

Fields:
- id
- payment_id
- amount
- currency
- reason nullable
- refunded_by_user_id nullable
- refunded_at
- provider_ref nullable
- created_at

## 9. Technician Workflow and Quality

### checklist_templates
Purpose:
- service-specific checklist definitions

Fields:
- id
- service_package_id
- name
- is_active
- created_at
- updated_at

### checklist_template_items
Purpose:
- line items in a checklist template

Fields:
- id
- checklist_template_id
- label
- sort_order
- is_required
- created_at

### checklist_results
Purpose:
- completed checklist instance for a booking

Fields:
- id
- booking_id
- checklist_template_id
- completed_by_technician_id nullable
- completed_at nullable
- created_at
- updated_at

### checklist_result_items
Purpose:
- result for each checklist item

Fields:
- id
- checklist_result_id
- checklist_template_item_id
- is_completed
- note nullable
- created_at

### job_notes
Purpose:
- technician or operator notes on a booking

Fields:
- id
- booking_id
- author_user_id
- note_type
- content
- is_customer_visible
- created_at

Suggested note type values:
- technician_note
- issue_flag
- operator_note

### media_assets
Purpose:
- photos tied to a booking

Fields:
- id
- booking_id
- uploaded_by_user_id
- asset_type
- url
- file_name nullable
- mime_type nullable
- size_bytes nullable
- caption nullable
- created_at

Suggested asset type values:
- before_photo
- after_photo
- issue_photo

## 10. Notifications

### notifications
Purpose:
- track outbound customer communications

Fields:
- id
- user_id
- booking_id nullable
- channel
- template_key
- status
- sent_at nullable
- failed_at nullable
- provider_ref nullable
- payload_json nullable
- created_at

Suggested channel values:
- email
- sms
- push

Suggested status values:
- queued
- sent
- failed

## Relationships Summary

Key relationships:
- one user can map to one or more roles
- one customer has many vehicles
- one customer has many bookings
- one vehicle has many bookings
- one service package has many bookings
- one booking can have many add-ons
- one booking can have many status events
- one booking can have many technician assignments over time
- one membership plan has many subscriptions
- one customer can have many subscriptions
- one booking can have one payment or multiple payment records depending on implementation detail
- one booking can have one checklist result and many notes or media assets

## Recommended Constraints

- enforce foreign keys across all relational tables
- prevent duplicate active default vehicles per customer
- ensure only one active technician assignment per booking in MVP
- ensure booking end time is after start time
- require either `booking_id` or `membership_subscription_id` on payments
- require a valid status enum on bookings, payments, subscriptions, and notifications

## Recommended Indexes

High-value indexes:
- users.email
- users.phone
- vehicles.plate_number
- bookings.scheduled_start_at
- bookings.location_id + status
- bookings.customer_id
- bookings.vehicle_id
- membership_subscriptions.customer_id
- payments.booking_id
- technician_assignments.technician_id + is_active

## Reporting Readiness

This schema supports MVP reporting such as:
- bookings per day
- completed jobs per location
- revenue per day
- active memberships
- average service duration from actual start and end timestamps
- technician workload and completion volume

## Future Expansion

Likely future tables:
- fleet_accounts
- fleet_vehicles
- route_stops
- mobile_service_territories
- promotions
- loyalty_points
- reviews
- inspections
- maintenance_reminders
- invoices
- webhook_events

## Recommendation

For MVP implementation, start with these highest-priority tables:
- users
- roles
- user_roles
- customers
- technicians
- locations
- vehicles
- service_packages
- service_add_ons
- bookings
- booking_add_ons
- technician_assignments
- membership_plans
- membership_subscriptions
- payments
- booking_status_events

Add checklist, media, notifications, and refunds after the booking core is stable.
