import { Suspense } from 'react'
import { VerifyPaymentClient } from '@/components/bills/verify-payment-client'

export default function VerifyPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Verifying Payment</h1>
              <p className="text-muted-foreground mt-2">
                Please wait while we confirm your payment...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <VerifyPaymentClient />
    </Suspense>
  )
}
