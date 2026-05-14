# Vehicle Care OS (VCO) Screen Specifications

## Overview

This document turns the MVP sitemap into wireframe-ready screen specs. It focuses on the primary screens needed to support the booking, operations, and technician workflow.

Each screen includes:
- purpose
- primary users
- main content blocks
- core actions
- key states

## 1. Customer Screens

## 1.1 Landing Page

Purpose:
- introduce the VCO-powered service experience and drive sign-up or booking

Primary users:
- prospective customers

Main content blocks:
- hero section
- value proposition
- services preview
- membership preview
- trust indicators
- call to action

Core actions:
- sign up
- log in
- start booking

Key states:
- default marketing state
- location-aware variant if location is preselected

## 1.2 Sign Up

Purpose:
- create customer account

Primary users:
- new customers

Main content blocks:
- name fields
- email or phone input
- password or OTP flow
- terms consent

Core actions:
- create account
- switch to log in

Key states:
- default
- validation errors
- success

## 1.3 Log In

Purpose:
- access account

Primary users:
- existing customers

Main content blocks:
- email or phone input
- password or OTP input
- reset link

Core actions:
- log in
- go to reset

Key states:
- default
- invalid credentials
- success redirect

## 1.4 Customer Home

Purpose:
- show the most important customer information at a glance

Primary users:
- customers

Main content blocks:
- next booking card
- current vehicle summary
- membership status card
- recent service history preview
- quick actions bar

Core actions:
- book service
- view booking detail
- switch vehicle
- open membership

Key states:
- no bookings yet
- active upcoming booking
- no membership
- active membership

## 1.5 Book Service Flow

Purpose:
- let customers complete a booking end to end

Primary users:
- customers

Main content blocks by step:
- step 1: select vehicle
- step 2: select service package
- step 3: select add-ons
- step 4: choose location or mobile service
- step 5: choose date and time
- step 6: review booking
- step 7: payment
- step 8: confirmation

Core actions:
- continue to next step
- go back
- confirm and pay

Key states:
- no saved vehicle
- no available time slots
- payment success
- payment failure

## 1.6 My Vehicles

Purpose:
- manage stored vehicles

Primary users:
- customers

Main content blocks:
- vehicles list
- add vehicle button
- default vehicle indicator

Core actions:
- add vehicle
- edit vehicle
- delete vehicle if allowed
- set default

Key states:
- empty state
- list populated

## 1.7 Vehicle Detail

Purpose:
- show one vehicle’s full profile and related history

Primary users:
- customers

Main content blocks:
- vehicle identity
- editable fields
- service history preview

Core actions:
- edit vehicle
- book service for this vehicle

Key states:
- no prior history
- existing history

## 1.8 Membership Overview

Purpose:
- present available plan or current subscription clearly

Primary users:
- customers

Main content blocks:
- current plan card or no-plan prompt
- available plans list
- benefits summary
- renewal information

Core actions:
- subscribe
- manage current plan

Key states:
- no active membership
- active membership
- canceled or expired membership

## 1.9 Service History

Purpose:
- let customers review past and upcoming services

Primary users:
- customers

Main content blocks:
- tabs or filters for upcoming and completed
- appointment cards

Core actions:
- open appointment detail
- rebook from history in later version

Key states:
- empty history
- upcoming only
- completed only

## 1.10 Appointment Detail

Purpose:
- show complete information for one booking

Primary users:
- customers

Main content blocks:
- booking summary
- vehicle summary
- service package and add-ons
- payment status
- status timeline
- technician notes
- before and after photos

Core actions:
- contact support in later version
- view receipt in later version

Key states:
- upcoming booking
- in progress booking
- completed booking
- canceled booking

## 1.11 Account Settings

Purpose:
- manage profile and preferences

Primary users:
- customers

Main content blocks:
- profile details
- contact preferences
- notification settings
- saved payment methods if supported

Core actions:
- update profile
- log out

Key states:
- default
- saved successfully

## 2. Operator Screens

## 2.1 Operator Dashboard

Purpose:
- give managers immediate operational visibility

Primary users:
- operators
- admins

Main content blocks:
- KPIs row
- today’s queue summary
- bookings by status
- revenue snapshot
- active memberships
- alerts or exceptions panel

Core actions:
- open bookings
- drill into exceptions
- filter by location and date

Key states:
- single location
- multi-location filtered view
- no bookings today

## 2.2 Bookings List / Calendar

Purpose:
- manage all bookings from one operational view

Primary users:
- operators

Main content blocks:
- date selector
- calendar or list toggle
- filters for location, status, technician
- bookings table or cards

Core actions:
- open booking detail
- create manual booking
- reschedule
- cancel
- assign technician

Key states:
- dense booking day
- no bookings
- filtered results

## 2.3 Booking Detail

Purpose:
- inspect and manage a single booking

Primary users:
- operators

Main content blocks:
- customer card
- vehicle card
- service and add-ons
- payment summary
- status timeline
- technician assignment block
- notes and media section

Core actions:
- change status
- assign or reassign technician
- update notes
- cancel or reschedule
- issue refund if permitted

Key states:
- pending
- confirmed
- assigned
- in progress
- completed
- canceled

## 2.4 Customers List

Purpose:
- search and manage customer records

Primary users:
- operators

Main content blocks:
- search bar
- filters
- customer rows with key account details

Core actions:
- open customer detail
- search by name, email, phone, or plate

Key states:
- empty search
- results list

## 2.5 Customer Detail

Purpose:
- provide a CRM-style view of a single customer

Primary users:
- operators

Main content blocks:
- profile summary
- linked vehicles
- booking history
- membership status
- notes
- payment summary

Core actions:
- create booking on behalf of customer
- update notes
- open vehicle detail
- manage membership

Key states:
- no bookings
- active membership
- multiple vehicles

## 2.6 Vehicles List

Purpose:
- locate vehicle records directly

Primary users:
- operators

Main content blocks:
- search by plate or customer
- vehicle rows with owner and last service info

Core actions:
- open vehicle detail

Key states:
- no vehicles
- filtered results

## 2.7 Vehicle Detail

Purpose:
- show service history at the vehicle level

Primary users:
- operators

Main content blocks:
- vehicle profile
- owner summary
- service history timeline
- notes and photos
- linked membership if applicable

Core actions:
- add internal note
- create booking
- open owner profile

Key states:
- no history
- extensive history

## 2.8 Services Management

Purpose:
- manage packages and add-ons

Primary users:
- operators
- admins

Main content blocks:
- packages list
- add-ons list
- active or inactive status
- durations and pricing

Core actions:
- create package
- edit package
- disable package
- create add-on

Key states:
- empty catalog
- active catalog

## 2.9 Membership Plans

Purpose:
- manage subscription offerings and active enrollments

Primary users:
- operators
- admins

Main content blocks:
- plan list
- plan summary cards
- active subscriptions table

Core actions:
- create plan
- edit plan
- pause or cancel subscription
- open subscription detail

Key states:
- no plans
- active plans with enrollments

## 2.10 Team / Technician Management

Purpose:
- manage staff availability and assignment visibility

Primary users:
- operators

Main content blocks:
- technicians list
- status indicators
- assigned jobs count
- average completion time

Core actions:
- open technician detail
- assign technician from here in later version

Key states:
- no technicians
- active shift view

## 2.11 Payments View

Purpose:
- track payment status and basic refunds

Primary users:
- operators
- admins

Main content blocks:
- payments table
- filters by status and date
- refund records

Core actions:
- open payment detail
- issue refund if authorized

Key states:
- no transactions
- mixed statuses

## 2.12 Reports

Purpose:
- present core business metrics in a simple way

Primary users:
- operators
- admins

Main content blocks:
- revenue trends
- bookings volume
- completed jobs
- active memberships
- average duration

Core actions:
- filter by date
- filter by location

Key states:
- no data yet
- single location
- multiple location comparison lite

## 2.13 Settings

Purpose:
- configure business basics required for operations

Primary users:
- admins
- authorized operators

Main content blocks:
- business profile
- locations
- roles and users
- notifications
- payment config

Core actions:
- save configuration
- invite staff in later version

Key states:
- incomplete setup
- fully configured

## 3. Technician Screens

## 3.1 Today’s Jobs

Purpose:
- provide a simple work queue for the technician

Primary users:
- technicians

Main content blocks:
- jobs list
- status chips
- time and vehicle summary

Core actions:
- open job
Key states:
- no assigned jobs
- multiple assigned jobs

## 3.2 Job Detail

Purpose:
- enable execution and progress tracking for one job

Primary users:
- technicians

Main content blocks:
- booking header
- vehicle information
- selected package and add-ons
- checklist
- notes field
- photo uploader
- status action bar

Core actions:
- start job
- update status
- complete checklist
- upload photos
- add note
- mark complete

Key states:
- assigned but not started
- in progress
- ready
- completed

## 3.3 Completed Jobs

Purpose:
- review recently completed work

Primary users:
- technicians

Main content blocks:
- completed job list
- completion times

Core actions:
- open recent completed job if needed

Key states:
- no completed jobs yet
- list populated

## 3.4 Technician Profile

Purpose:
- basic profile and session controls

Primary users:
- technicians

Main content blocks:
- display name
- primary location
- session actions

Core actions:
- log out

## 4. Shared Components

These components should be designed once and reused:
- top navigation
- side navigation for operator dashboard
- booking status badge
- KPI cards
- table and filter bars
- vehicle summary card
- customer summary card
- booking timeline
- empty state pattern
- toast or inline success and error messages
- photo gallery block
- checklist item row

## 5. Wireframing Priority

Highest-priority screens to wireframe first:
- customer booking flow
- operator dashboard
- operator booking detail
- technician job detail
- customer appointment detail
- membership overview

## 6. UX Notes

- the booking flow should be fast, linear, and mobile-friendly
- operator views should prioritize density and filtering over decorative layout
- technician screens should minimize text input and expose large status actions
- customer detail views should emphasize trust, clarity, and service transparency
