# Vehicle Care OS (VCO) MVP Epics and User Stories

## Overview

This document translates the MVP PRD into buildable product work. Each epic groups related functionality needed for the first pilot version of `Vehicle Care OS`.

## Epic 1: Authentication and Access

### Goal
Allow customers, operators, and technicians to securely access the correct parts of the platform.

### User Stories
- As a customer, I want to create an account so that I can book and manage services.
- As a customer, I want to log in securely so that I can access my vehicles, bookings, and membership.
- As a user, I want to recover my account so that I can regain access without support.
- As an operator, I want role-based access so that staff only see the tools relevant to them.
- As a technician, I want a simplified login experience so that I can access assigned jobs quickly.

### Acceptance Notes
- role-based routing is enforced
- unauthorized users cannot access restricted pages
- login and reset flows are stable on desktop and mobile

## Epic 2: Customer and Vehicle Profiles

### Goal
Create persistent customer and vehicle records that support booking, history, and operations.

### User Stories
- As a customer, I want to add one or more vehicles so that I can book services for each one.
- As a customer, I want to edit vehicle details so that my records stay accurate.
- As an operator, I want to search customer records so that I can support active bookings quickly.
- As an operator, I want to search by plate number so that I can locate a vehicle record fast.
- As an operator, I want each vehicle to retain service history so that I can understand past work.

### Acceptance Notes
- multiple vehicles per customer are supported
- vehicle details are reusable during booking
- customer and vehicle data are linked bidirectionally

## Epic 3: Service Catalog and Pricing

### Goal
Allow operators to define the services customers can book.

### User Stories
- As an operator, I want to create service packages so that I can offer standardized services.
- As an operator, I want to set package pricing so that customers see accurate rates.
- As an operator, I want to create add-ons so that I can increase ticket size.
- As an operator, I want to define estimated durations so that scheduling is realistic.
- As an operator, I want to disable services by location so that unavailable services cannot be booked.

### Acceptance Notes
- changes to catalog appear in booking flow
- inactive packages do not appear to customers
- estimated duration is stored per package

## Epic 4: Booking Flow

### Goal
Enable customers to complete a booking end to end.

### User Stories
- As a customer, I want to select a vehicle so that the booking is tied to the correct car.
- As a customer, I want to choose a service and add-ons so that I can customize the appointment.
- As a customer, I want to select a time slot so that I can schedule the service conveniently.
- As a customer, I want a review screen so that I can confirm all booking details before paying.
- As a customer, I want confirmation after booking so that I know the appointment was created.
- As an operator, I want booking availability to prevent conflicts so that the schedule remains usable.

### Acceptance Notes
- booking includes vehicle, service, location, date, and time
- unavailable slots cannot be selected
- confirmation is generated immediately after successful booking

## Epic 5: Payments

### Goal
Support payment collection and payment visibility for operators.

### User Stories
- As a customer, I want to pay during booking so that my appointment is confirmed immediately.
- As a customer, I want to know whether payment succeeded so that I do not submit duplicate bookings.
- As an operator, I want to see payment status on each booking so that I can manage exceptions.
- As an operator, I want to issue a refund so that customer service issues can be resolved.
- As an operator, I want to mark manual payment when needed so that offline payments can still be tracked.

### Acceptance Notes
- payment state is tied to booking state
- failed transactions do not appear as paid bookings
- refund events are logged

## Epic 6: Operator Booking Operations

### Goal
Give operators control over the daily service queue.

### User Stories
- As an operator, I want a daily bookings view so that I can run operations from one screen.
- As an operator, I want to reschedule bookings so that I can handle customer or staffing changes.
- As an operator, I want to cancel bookings with a reason so that exceptions are documented.
- As an operator, I want to assign technicians so that jobs are clearly owned.
- As an operator, I want to filter bookings by location, status, and technician so that I can manage volume efficiently.

### Acceptance Notes
- booking status changes update customer-facing views
- reschedules are timestamped and visible in history
- assignment changes propagate immediately to technician queues

## Epic 7: Technician Workflow

### Goal
Enable technicians to execute jobs and keep the system updated in real time.

### User Stories
- As a technician, I want to see today’s assigned jobs so that I know what to work on.
- As a technician, I want job details with vehicle and service info so that I do not need operator follow-up.
- As a technician, I want to update job status so that operators and customers have current information.
- As a technician, I want a checklist so that I can complete work consistently.
- As a technician, I want to upload photos and notes so that service quality and issues are documented.

### Acceptance Notes
- technicians only see their own assigned work unless permissions allow more
- job status changes are timestamped
- checklist completion is stored with the booking

## Epic 8: Service History and Records

### Goal
Turn each completed booking into a useful record for customers and operators.

### User Stories
- As a customer, I want to review past services so that I can track what was done to my vehicle.
- As a customer, I want to see notes or photos when available so that I trust the quality of service.
- As an operator, I want all completed jobs tied to vehicle history so that I can support retention and issue resolution.
- As an operator, I want to view a customer timeline so that I can understand repeat behavior and service context.

### Acceptance Notes
- completed jobs appear in both customer history and operator CRM
- notes and media attach to the right job record
- vehicle history is searchable

## Epic 9: Memberships

### Goal
Support recurring revenue through plan management for operators and self-service visibility for customers.

### User Stories
- As a customer, I want to view available plans so that I can subscribe to a membership.
- As a customer, I want to see my active membership status so that I understand my benefits and renewal.
- As an operator, I want to create membership plans so that I can offer recurring packages.
- As an operator, I want to pause, cancel, or change memberships so that I can handle customer requests.
- As an operator, I want visibility into active and expiring memberships so that I can manage retention.

### Acceptance Notes
- plans can be created and edited by operators
- customer account reflects current plan status
- active membership counts appear in reporting

## Epic 10: Dashboard and Reporting

### Goal
Give operators a simple but useful view into business performance.

### User Stories
- As an operator, I want to see bookings and revenue today so that I can monitor daily performance.
- As an operator, I want to see completed jobs so that I can assess throughput.
- As an operator, I want to see active memberships so that I can monitor recurring revenue health.
- As an operator, I want average service duration so that I can understand operational efficiency.
- As an operator, I want date and location filters so that I can compare performance at a basic level.

### Acceptance Notes
- dashboard metrics are based on live operational data
- reporting loads quickly enough for daily use
- date filtering supports basic operational review

## Epic 11: Notifications and Communication

### Goal
Keep customers informed and reduce manual follow-up.

### User Stories
- As a customer, I want booking confirmation so that I know my appointment was created.
- As a customer, I want service status updates so that I know when work starts and finishes.
- As an operator, I want key customer notifications automated so that staff spend less time manually messaging.

### Acceptance Notes
- booking confirmation is sent after successful booking
- status updates are triggered by core workflow changes
- notification failures are logged where possible

## Epic 12: Settings and Business Configuration

### Goal
Allow the business to manage the minimum configuration needed to operate.

### User Stories
- As an operator, I want to manage locations so that bookings can be routed correctly.
- As an operator, I want to manage users and roles so that staff access is controlled.
- As an operator, I want to configure payment and notification settings so that core workflows function.
- As an operator, I want business profile details stored so that customer-facing experiences stay accurate.

### Acceptance Notes
- at least one location is required for launch
- settings changes are persisted and reflected in live workflows
- user roles affect access immediately after update

## Suggested Release Plan

### Release 1
- Epic 1: Authentication and Access
- Epic 2: Customer and Vehicle Profiles
- Epic 3: Service Catalog and Pricing
- Epic 4: Booking Flow
- Epic 6: Operator Booking Operations

### Release 2
- Epic 5: Payments
- Epic 7: Technician Workflow
- Epic 8: Service History and Records
- Epic 11: Notifications and Communication

### Release 3
- Epic 9: Memberships
- Epic 10: Dashboard and Reporting
- Epic 12: Settings and Business Configuration

## Highest Priority User Stories

The first stories to build should be:
- customer account creation
- add vehicle
- create service package
- create booking
- operator daily bookings view
- assign technician
- update booking status
- collect payment
- show customer booking history
- create membership plan

## Delivery Recommendation

If the team is small, organize implementation around these workstreams:
- platform and auth
- customer booking and payments
- operator dashboard and CRM
- technician workflow
- memberships and reporting
