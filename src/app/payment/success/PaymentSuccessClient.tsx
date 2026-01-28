'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function PaymentSuccessClient() {
    const { token, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState<any>(null);
    const [enrollment, setEnrollment] = useState<any>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const orderId = searchParams.get('order_id');

        if (authLoading) return;

        if (!token) {
            router.push('/login');
            return;
        }

        if (!orderId) {
            setError('Invalid payment reference');
            setLoading(false);
            return;
        }

        verifyPayment(orderId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, searchParams, authLoading, router]);

    const verifyPayment = async (orderId: string) => {
        try {
            const response = await api.payments.verifyPayment({
                order_id: orderId,
                payment_id: '',
                merchant_id: '',
                status_code: '',
                md5sig: '',
            });

            setPayment(response.data.payment);
            setEnrollment(response.data.enrollment);
        } catch (err: any) {
            setError(err.message || 'Failed to verify payment');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying payment...</p>
                </div>
            </div>
        );
    }

    if (error || !payment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <h2 className="mt-4 text-xl font-bold text-gray-900">Payment Verification Failed</h2>
                        <p className="mt-2 text-gray-600">{error || 'Unable to verify your payment'}</p>
                        <Link
                            href="/my-account"
                            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Go to My Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    {payment.status === 'completed' ? (
                        <>
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                                <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
                            <p className="mt-2 text-gray-600">
                                Thank you for your purchase. You are now enrolled in the course.
                            </p>

                            {enrollment && (
                                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Order ID:</strong> {payment.id}</p>
                                        <p><strong>Amount:</strong> LKR {payment.amount}</p>
                                        <p><strong>Date:</strong> {new Date(payment.paid_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 space-y-3">
                                <Link
                                    href="/my-account"
                                    className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                                >
                                    Go to My Courses
                                </Link>
                                <Link
                                    href="/courses"
                                    className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
                                >
                                    Browse More Courses
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
                                <svg className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Pending</h2>
                            <p className="mt-2 text-gray-600">
                                Your payment is being processed. Please check back shortly.
                            </p>
                            <Link
                                href="/my-account"
                                className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Go to My Account
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
