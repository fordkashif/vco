# Vehicle Care OS (VCO) MVP PRD

## Product Summary

`Vehicle Care OS (VCO)` is a vehicle care operations platform for car wash, detailing, and mobile service businesses. The MVP focuses on helping operators run bookings, memberships, technician workflow, payments, and customer communication from one system.

This version is not intended to solve every vehicle service use case. It is built to prove that a modern, premium software layer can improve operations and customer retention for multi-location vehicle care businesses.

## Product Goal

Build the first usable version of `VCO` for operators that need:
- reliable booking management
- recurring membership revenue
- technician job tracking
- customer and vehicle records
- basic business visibility

## Problem Statement

Vehicle care businesses often rely on disconnected tools and manual processes. This causes:
- missed or duplicated bookings
- weak membership retention
- poor visibility into service status
- inconsistent customer communication
- no unified service history for each vehicle
- limited reporting on team and revenue performance

## Target Customer

Primary target:
- multi-location car wash and detailing businesses with recurring memberships

Secondary targets:
- premium detailing shops
- mobile detailers with field technicians
- fleet cleaning operators

## Primary Users

### 1. Customer
A car owner who wants to book, pay for, and track vehicle care services.

### 2. Operator
A manager or owner who oversees bookings, staff, memberships, payments, and daily service flow.

### 3. Technician
A worker who performs the service and updates job status, notes, and media.

## MVP Scope

The MVP includes three surfaces:
- customer app or responsive customer portal
- operator dashboard
- technician workflow interface

## Core User Outcomes

Customers should be able to:
- add their vehicle
- book a service
- pay online
- view appointment status
- join or manage a membership
- view service history

Operators should be able to:
- manage bookings in a calendar or queue
- define services, packages, and add-ons
- assign technicians
- manage customers, vehicles, and memberships
- track payment status
- view key daily metrics

Technicians should be able to:
- view assigned jobs
- update progress stages
- complete service checklists
- upload before and after photos
- add notes or flag issues

## Non-Goals

The MVP will not include:
- full maintenance and repair workflows
- inventory management
- complex accounting features
- advanced route optimization
- AI recommendations
- marketplace integrations
- franchise-level enterprise permissions

## Key Assumptions

- businesses will pay for operational software if it clearly improves repeat revenue and throughput
- memberships are a strong retention lever in this category
- operators need vehicle-level records, not only customer-level records
- technician workflow visibility increases customer trust and reduces service confusion

## Feature Requirements

## 1. Customer Experience

### 1.1 Authentication and Account
Users can:
- sign up with email or phone
- log in securely
- manage basic profile details

Acceptance criteria:
- users can create an account without operator intervention
- users can sign in and out successfully
- users can recover access through a basic reset flow

### 1.2 Vehicle Management
Users can:
- add one or more vehicles
- store make, model, year, color, and plate number
- choose a default vehicle

Acceptance criteria:
- each account can hold multiple vehicles
- vehicle details persist across bookings
- operator can view linked vehicles in CRM

### 1.3 Service Booking
Users can:
- browse available services and add-ons
- choose location-based service or mobile service
- pick available time slots
- confirm booking details before payment

Acceptance criteria:
- booking flow prevents double-booking of unavailable slots
- booking includes selected vehicle, service, date, time, and location
- customer receives booking confirmation after submission

### 1.4 Payments
Users can:
- pay at booking
- view payment status
- receive confirmation

Acceptance criteria:
- payment result is linked to the booking record
- operator can see paid, unpaid, or refunded status
- failed payment attempts do not create confirmed paid bookings

### 1.5 Memberships
Users can:
- browse membership plans
- subscribe to a plan
- view plan status and renewal date

Acceptance criteria:
- operator can create and manage available plans
- customer account shows active membership status
- membership record is linked to the customer and vehicle where applicable

### 1.6 Service Status and History
Users can:
- view current appointment status
- review previous services
- view service notes and media when available

Acceptance criteria:
- booking statuses are visible in the customer view
- completed jobs appear in service history
- photos or notes uploaded by technicians can be attached to completed jobs

## 2. Operator Dashboard

### 2.1 Booking Management
Operators can:
- view bookings by day
- reschedule or cancel bookings
- move jobs through service states
- filter by location, technician, and status

Acceptance criteria:
- daily view shows all bookings clearly
- rescheduling updates customer-facing status
- cancellation records reason and state

### 2.2 Service Catalog Management
Operators can:
- create service packages
- configure pricing
- define add-ons
- enable or disable offerings by location

Acceptance criteria:
- service catalog changes appear in customer booking flow
- inactive services cannot be booked
- pricing changes apply to new bookings only unless manually updated

### 2.3 Customer and Vehicle CRM
Operators can:
- search customers
- view customer profile and booking history
- view linked vehicles and service records

Acceptance criteria:
- operator can search by customer name, phone, email, or plate number
- customer timeline shows bookings, payments, and membership status
- vehicle history is visible from both customer and vehicle records

### 2.4 Membership Management
Operators can:
- create plans
- view active members
- pause, cancel, or modify memberships

Acceptance criteria:
- membership changes are reflected in the customer profile
- operator can identify expiring or canceled memberships
- plan enrollment counts are visible in dashboard reporting

### 2.5 Technician Assignment
Operators can:
- assign jobs to technicians
- reassign work if needed
- view technician workload

Acceptance criteria:
- jobs can be assigned from the booking view
- technicians only see jobs assigned to them unless role settings allow otherwise
- reassignment updates technician job lists immediately

### 2.6 Payments and Refunds
Operators can:
- view payment status by booking
- mark manual payments if needed
- initiate basic refunds

Acceptance criteria:
- payment state is visible from booking detail
- refund actions are logged
- finance data appears in dashboard summaries

### 2.7 Basic Analytics
Operators can view:
- bookings today
- revenue today
- active memberships
- completed jobs
- average service duration

Acceptance criteria:
- dashboard metrics refresh from live system data
- metrics can be filtered by date range and location in MVP-lite form

## 3. Technician Workflow

### 3.1 Assigned Jobs
Technicians can:
- view today’s jobs
- open job detail
- see vehicle, package, notes, and timing

Acceptance criteria:
- technician only sees jobs relevant to their role or assignment
- job detail includes enough information to perform the service without operator follow-up

### 3.2 Job Status Updates
Technicians can:
- move work through statuses such as scheduled, in progress, ready, and completed

Acceptance criteria:
- status changes update both operator and customer views
- job progression is timestamped

### 3.3 Service Checklist
Technicians can:
- complete checklist items tied to service type
- confirm completion before closing a job

Acceptance criteria:
- checklist template can vary by service package
- completed jobs store checklist results

### 3.4 Photos and Notes
Technicians can:
- upload before and after photos
- add notes
- flag issues such as damage or customer concerns

Acceptance criteria:
- media uploads attach to the correct booking
- notes are visible to operators
- selected notes can be surfaced to customers on completion

## User Flows

## Flow 1: Customer Books a Service
1. Customer signs in
2. Customer selects vehicle
3. Customer selects service and add-ons
4. Customer picks time and location
5. Customer pays
6. Booking is created
7. Customer receives confirmation

## Flow 2: Operator Runs Daily Queue
1. Operator opens dashboard
2. Operator reviews today’s bookings
3. Operator assigns technicians
4. Operator monitors job progress
5. Operator handles exceptions or reschedules
6. Operator reviews end-of-day revenue and completion metrics

## Flow 3: Technician Completes a Job
1. Technician opens assigned job
2. Technician starts job
3. Technician follows checklist
4. Technician uploads photos and notes
5. Technician marks job complete
6. Customer sees updated status and service record

## Success Metrics

The MVP should be evaluated on:
- booking completion rate
- percentage of bookings paid online
- membership conversion rate
- repeat booking rate
- average job completion time
- operator time saved on scheduling and coordination
- percentage of jobs updated in real time by technicians

## Technical Requirements

Baseline requirements:
- responsive web support for all user roles
- role-based access for customer, operator, and technician
- central booking and service database
- payment provider integration
- basic notification support for confirmations and status updates
- audit trail for critical actions such as status changes and refunds

## Suggested Data Model

Core entities:
- user
- customer profile
- operator profile
- technician profile
- vehicle
- booking
- service package
- add-on
- location
- membership plan
- membership subscription
- payment
- checklist template
- checklist result
- job note
- media asset

## Risks

Key risks:
- overbuilding too early instead of proving the core booking and membership loop
- weak service-slot logic causing operational confusion
- poor technician adoption if the workflow is too heavy
- low-quality reporting if operational data is not structured properly
- trying to support every business model in V1

## Decisions

Current product decisions:
- prioritize multi-location wash and detailing operators first
- build around memberships and repeat usage, not one-time bookings only
- support both customer-facing and operator-facing experiences in V1
- treat vehicle history as a first-class object in the system

## Open Questions

Questions to resolve before implementation:
- should the MVP launch as responsive web only or include a native mobile app shell
- will memberships attach to customer account, vehicle, or both
- how should location capacity and technician availability interact in scheduling
- which payment provider is the fastest to integrate for the target market
- what level of customer notifications is required in V1

## Recommended MVP Build Order

### Phase 1
- auth
- customer and vehicle records
- service catalog
- booking flow
- operator booking dashboard

### Phase 2
- payments
- technician assignment and status tracking
- service history
- notifications

### Phase 3
- memberships
- analytics dashboard
- photo uploads and checklists

## Launch Definition

The MVP is ready for pilot use when:
- customers can complete a booking and payment flow end to end
- operators can manage the daily queue without external spreadsheets
- technicians can update job status from their interface
- completed jobs generate service history records
- memberships can be created and tracked for pilot customers

## Product Pitch

`Vehicle Care OS is the operating system for modern vehicle care businesses. It helps car wash and detailing operators manage bookings, memberships, technicians, payments, and service records from one platform.`
