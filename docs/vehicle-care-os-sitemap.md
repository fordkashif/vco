# Vehicle Care OS (VCO) App Sitemap

## Overview

The MVP should be structured across three product surfaces:
- customer app or responsive portal
- operator dashboard
- technician interface

This sitemap is based on the MVP PRD and focuses only on pages needed for the first pilot version.

## 1. Customer App / Portal

### 1.1 Marketing and Entry
- Landing Page
- Sign Up
- Log In
- Password Reset

### 1.2 Main Customer Navigation
- Home
- Book Service
- My Vehicles
- Membership
- History
- Account

### 1.3 Page Breakdown

#### Landing Page
Purpose:
- explain what VCO-powered service offers
- drive account creation or booking

Key sections:
- hero
- service overview
- membership overview
- trust indicators
- call to action

#### Sign Up
Purpose:
- create customer account

Key elements:
- name
- email or phone
- password or OTP flow
- consent and terms

#### Log In
Purpose:
- access customer account

Key elements:
- email or phone
- password or OTP
- recovery link

#### Password Reset
Purpose:
- restore account access

#### Home
Purpose:
- show current vehicle, next booking, membership status, and quick actions

Key elements:
- next appointment card
- quick book action
- active membership card
- recent service summary

#### Book Service
Purpose:
- complete service booking flow

Sub-steps:
- select vehicle
- select service package
- select add-ons
- choose location or mobile service
- choose date and time
- review and pay
- booking confirmation

#### My Vehicles
Purpose:
- manage stored vehicles

Sub-pages:
- vehicle list
- add vehicle
- edit vehicle
- vehicle detail

Vehicle detail includes:
- vehicle info
- default vehicle toggle
- service history for that vehicle

#### Membership
Purpose:
- browse and manage plan

Sub-pages:
- membership overview
- plan selection
- active plan detail

Active plan detail includes:
- plan name
- billing status
- renewal date
- benefits summary

#### History
Purpose:
- review completed and upcoming services

Sub-pages:
- appointment list
- appointment detail

Appointment detail includes:
- service package
- vehicle
- date and time
- payment status
- technician notes
- before and after photos if available

#### Account
Purpose:
- manage customer profile and preferences

Sub-pages:
- profile settings
- payment methods
- notifications preferences
- logout

## 2. Operator Dashboard

### 2.1 Main Navigation
- Dashboard
- Bookings
- Customers
- Vehicles
- Services
- Memberships
- Team
- Payments
- Reports
- Settings

### 2.2 Page Breakdown

#### Dashboard
Purpose:
- daily operational overview

Key widgets:
- bookings today
- revenue today
- completed jobs
- active memberships
- average service duration
- jobs needing attention

#### Bookings
Purpose:
- manage daily and future bookings

Sub-pages:
- calendar view
- queue view
- booking detail
- create manual booking

Booking detail includes:
- customer
- vehicle
- package and add-ons
- assigned technician
- payment state
- status timeline
- notes
- actions for reschedule, cancel, reassign

#### Customers
Purpose:
- manage customer CRM

Sub-pages:
- customer list
- customer detail

Customer detail includes:
- profile info
- vehicles
- booking history
- membership status
- notes
- payment summary

#### Vehicles
Purpose:
- view and search vehicle records directly

Sub-pages:
- vehicle list
- vehicle detail

Vehicle detail includes:
- owner
- vehicle profile
- service history
- membership linkage if applicable
- notes and photos

#### Services
Purpose:
- manage service catalog

Sub-pages:
- package list
- create package
- edit package
- add-ons list

Package detail includes:
- package name
- price
- estimated duration
- checklist template
- availability by location

#### Memberships
Purpose:
- manage recurring plans and customers enrolled

Sub-pages:
- plan list
- create plan
- active subscriptions
- membership detail

Membership detail includes:
- customer
- vehicle if linked
- current status
- renewal info
- change history

#### Team
Purpose:
- manage technicians and assignments

Sub-pages:
- team list
- technician detail
- workload view

Technician detail includes:
- assigned jobs
- status
- completed jobs count
- average completion time

#### Payments
Purpose:
- review transaction status and refunds

Sub-pages:
- payments list
- payment detail
- refund log

#### Reports
Purpose:
- view core performance metrics

Sub-pages:
- daily performance
- revenue summary
- membership summary
- service duration summary

#### Settings
Purpose:
- manage operational configuration

Sub-pages:
- business profile
- locations
- user roles
- notification settings
- payment settings

## 3. Technician Interface

### 3.1 Main Navigation
- Today’s Jobs
- Job Detail
- Completed Jobs
- Profile

### 3.2 Page Breakdown

#### Today’s Jobs
Purpose:
- show assigned jobs for the day

Key elements:
- job cards
- scheduled time
- vehicle
- package
- status

#### Job Detail
Purpose:
- execute and update service work

Key sections:
- booking summary
- vehicle details
- checklist
- notes
- photo upload
- status actions

Status actions:
- start job
- mark in progress
- mark ready
- mark completed

#### Completed Jobs
Purpose:
- review recently completed work

#### Profile
Purpose:
- basic technician account settings

## 4. Shared System Pages

Shared pages and states:
- unauthorized or access denied
- not found
- generic error state
- empty states for no bookings, no vehicles, no memberships
- loading states for booking and dashboard data

## 5. Suggested Navigation Priority For MVP

### Customer Priority
1. Home
2. Book Service
3. My Vehicles
4. Membership
5. History
6. Account

### Operator Priority
1. Dashboard
2. Bookings
3. Customers
4. Services
5. Memberships
6. Team
7. Payments
8. Reports
9. Settings

### Technician Priority
1. Today’s Jobs
2. Job Detail
3. Completed Jobs
4. Profile

## 6. MVP Page Count Estimate

Customer:
- 10 to 14 key screens depending on booking flow structure

Operator:
- 12 to 18 key screens depending on reporting depth

Technician:
- 4 to 6 key screens

## 7. Recommended Design Starting Point

Start with the following screens first because they define the core workflow:
- customer booking flow
- operator dashboard
- operator bookings view
- booking detail
- technician job detail
- customer history detail
- membership overview

## 8. Build Sequence From Sitemap

### Wave 1
- landing page
- sign up and log in
- customer vehicles
- booking flow
- operator dashboard
- operator bookings

### Wave 2
- customer history
- operator customers
- services management
- technician job workflow
- payments visibility

### Wave 3
- memberships
- reports
- settings
- photo and checklist enhancements
