export enum UserRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum IdeaStatus {
  DRAFT = "DRAFT",
  ON_REVIEW = "ON_REVIEW",
  PUBLISHED = "PUBLISHED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
  REJECTED = "REJECTED",
}

export enum Currency {
  USD = "USD",
  BDT = "BDT",
  INR = "INR",
  EUR = "EUR",
}

export enum PaymentGateway {
  STRIPE = "STRIPE",
  SSLCOMMERZ = "SSLCOMMERZ",
  PAYPAL = "PAYPAL",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
}
