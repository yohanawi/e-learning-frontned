'use client';

import Link from 'next/link';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                        <svg className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Cancelled</h2>
                    <p className="mt-2 text-gray-600">
                        Your payment was cancelled. No charges have been made to your account.
                    </p>

                    <div className="mt-6 space-y-3">
                        <Link
                            href="/courses"
                            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                        >
                            Back to Courses
                        </Link>
                        <Link
                            href="/my-account"
                            className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                        >
                            My Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
