# Vehicle Care OS (VCO) Phased Build Plan

## Overview

This build plan sequences the MVP into practical implementation phases. It is optimized for a small product team building a web-first pilot.

The plan assumes these guiding priorities:
- prove the booking and operations loop first
- avoid overbuilding before operator workflow is stable
- add memberships and reporting after the core service flow works reliably

## Phase 0: Foundation

### Objective
Set up the technical and product foundation required for feature delivery.

### Scope
- repository and environment setup
- design system foundation
- routing structure
- authentication architecture
- database setup and migrations
- role-based access scaffolding
- basic logging and error handling

### Deliverables
- base app shell
- auth-ready user model
- initial database schema migrations
- shared UI primitives
- deployment pipeline for staging

### Exit Criteria
- team can deploy to staging consistently
- users can authenticate into role-specific surfaces
- database migrations run cleanly across environments

## Phase 1: Booking Core

### Objective
Ship the minimum booking loop for customers and operators.

### Scope
- customer sign up and log in
- customer profile basics
- vehicle management
- service catalog management
- booking flow
- operator bookings view
- operator booking detail
- booking status handling

### Deliverables
- customer can create account
- customer can add vehicle
- operator can create and manage service packages
- customer can create booking
- operator can view and manage bookings

### Dependencies
- Phase 0 complete

### Exit Criteria
- customer can complete booking flow in staging
- operator can view and update bookings without external tools
- booking records are stored reliably with service and vehicle linkage

## Phase 2: Scheduling and Staff Workflow

### Objective
Make the booking system operationally usable day to day.

### Scope
- technician profile setup
- technician assignment flow
- technician today’s jobs view
- technician job detail
- booking status progression from staff interface
- booking timeline and status events

### Deliverables
- operator can assign technicians
- technicians can update job status
- operator and customer views reflect live status

### Dependencies
- Phase 1 complete

### Exit Criteria
- technicians can work from the product rather than verbal coordination alone
- operators can track progress of jobs throughout the day
- audit trail exists for booking status changes

## Phase 3: Payments and Customer Transparency

### Objective
Add payment collection and customer-facing service visibility.

### Scope
- payment provider integration
- booking payment step
- payment status in operator dashboard
- customer booking confirmation
- customer appointment detail
- customer service history
- notification hooks for confirmations and status changes

### Deliverables
- customer can pay online during booking
- operator can see payment state and handle exceptions
- customer can review service history and booking detail

### Dependencies
- Phase 1 complete
- Phase 2 recommended but not strictly required for payment work

### Exit Criteria
- paid bookings are tracked correctly
- failed payments are handled cleanly
- customers can see the state of their appointment and prior completed work

## Phase 4: Quality Workflow

### Objective
Capture service execution quality through notes, photos, and checklists.

### Scope
- checklist template management
- technician checklist completion
- photo upload flow
- job notes
- internal notes visibility for operators
- selected customer-visible notes or photos in appointment detail

### Deliverables
- service package can include a checklist
- technicians can attach before and after photos
- completed service records are richer and more trustworthy

### Dependencies
- Phase 2 complete
- Phase 3 partly complete for best customer impact

### Exit Criteria
- technicians can complete jobs with consistent structure
- operators can review media and notes on completed jobs
- customer history includes richer service detail where applicable

## Phase 5: Memberships

### Objective
Introduce recurring revenue support.

### Scope
- membership plans
- subscription records
- customer membership overview
- operator membership management
- membership status linkage to customer and booking records

### Deliverables
- operators can create plans
- customers can subscribe to plans
- operator can manage active memberships

### Dependencies
- Phase 1 complete
- Phase 3 recommended because payments are relevant

### Exit Criteria
- active subscriptions are visible in both customer and operator views
- membership counts can be reported accurately
- plan data is stable enough for pilot customers

## Phase 6: Reporting and Configuration

### Objective
Provide operators with usable business insight and complete operational setup.

### Scope
- dashboard KPI refinement
- reports page
- date and location filters
- business profile settings
- location settings
- user and role management basics
- payment and notification configuration

### Deliverables
- operator dashboard with reliable metrics
- reports for revenue, bookings, memberships, and service duration
- settings needed to manage the pilot environment

### Dependencies
- prior phases should be substantially complete

### Exit Criteria
- operator can review daily performance without external reporting tools
- locations and staff roles are configurable in product
- pilot environment can be managed without direct developer intervention for normal operations

## Recommended Team Workstreams

For a small team, split delivery into these parallel tracks where possible:

### Track A: Platform
- auth
- database
- roles
- deployment
- shared components

### Track B: Customer Experience
- landing and auth screens
- vehicle management
- booking flow
- history and membership views

### Track C: Operator Experience
- dashboard
- bookings
- customers
- vehicles
- services
- memberships
- reports

### Track D: Technician Experience
- assigned jobs
- job detail
- status updates
- checklist and photo flow

## Suggested Milestones

### Milestone 1: Internal Demo
Includes:
- auth
- customer vehicle setup
- service catalog
- booking flow
- operator booking view

Definition:
- end-to-end booking can be demonstrated internally

### Milestone 2: Operational Pilot
Includes:
- technician assignment
- technician workflow
- booking status updates
- payment visibility
- customer history

Definition:
- one pilot operator can run daily bookings from the system

### Milestone 3: Revenue Pilot
Includes:
- payments
- memberships
- notifications
- service detail transparency

Definition:
- pilot business can run both appointments and recurring memberships through VCO

### Milestone 4: Pilot Hardening
Includes:
- reports
- settings
- quality workflow improvements
- operational cleanup and bug fixing

Definition:
- product is stable enough for broader pilot rollout

## Delivery Risks

Major risks to manage:
- building reports before core event data is trustworthy
- making the technician workflow too complex for real-world use
- weak booking slot logic causing operator frustration
- introducing memberships before payment and customer records are stable
- spreading effort across too many surfaces at once

## Recommended Technical Order

Build in this order:
1. auth and roles
2. core entities and database migrations
3. service catalog
4. vehicle management
5. booking creation and operator booking management
6. technician assignments and status workflow
7. payments and customer history
8. checklists and media
9. memberships
10. reporting and settings

## Definition of MVP Complete

The MVP is complete when:
- customers can sign up, add a vehicle, book, and pay
- operators can manage bookings, services, customers, and staff assignments
- technicians can work from assigned jobs and update status
- service history is generated from completed bookings
- memberships can be created and tracked
- operators can view core business metrics without relying on spreadsheets

## Recommendation

Do not try to launch all screens at once.

The first production-worthy release should center on:
- booking
- operator queue management
- technician status updates
- payment visibility

Everything else should strengthen that loop rather than compete with it.
