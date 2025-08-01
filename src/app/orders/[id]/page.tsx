"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import type { CartItem } from "@/types/product";
import { useState } from "react";
import Image from "next/image";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const orders = useSelector((state: RootState) => state.order.orders);
  const order = orders.find((o) => o.id === id);
  const [showInvoice, setShowInvoice] = useState(false);

  if (!order) {
    return (
      <main className="max-w-7xl mx-auto p-6 pt-20 bg-white sm:pt-24">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Order not found
          </h1>
          <Link href="/orders">
            <span className="text-gray-800 hover:text-blue-800 underline mt-4 inline-block">
              ← Back to Orders
            </span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 bg-white lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Placed on {new Date(order.date).toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Customer:</span> {order.customer}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order.address}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Items</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item: CartItem) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <Link
              href="/orders"
              className="text-gray-800 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Orders
            </Link>

            <button
              onClick={() => setShowInvoice(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              View Invoice
            </button>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full h-full max-w-screen overflow-y-auto px-4 sm:px-10 py-6 sm:py-10 print:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowInvoice(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl print:hidden"
            >
              &times;
            </button>

            <div className="w-full mx-auto text-gray-900 max-w-4xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold">Invoice</h2>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Tech Element</span>, 126
                    Lavel/Lift-16 Lily Pond Center,
                    <br /> 3 RK Mission Rd, Dhaka 1000
                  </p>

                  <div className="mt-6 text-sm">
                    <p className="font-semibold mb-1">BILL TO</p>
                    <p>{order.customer}</p>
                    <p>{order.address}</p>
                    <p>{order.phone}</p>
                  </div>
                </div>

                <div className="text-sm text-right">
                  <Image
                    src="/Asset/logo.png"
                    alt="alt"
                    width={80}
                    height={80}
                    className="mx-auto sm:mx-0 w-20 h-auto"
                  />
                  <p>
                    <strong>Invoice No.:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Issue date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Due date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Reference:</strong> {order.id}
                  </p>
                </div>
              </div>

              {/* Highlight row */}
              <div className="grid grid-cols-2 bg-blue-600 sm:grid-cols-3 gap-2 sm:gap-4 text-white text-center mb-10 text-sm font-semibold">
                <div className="bg-blue-600 py-2 px-2 rounded">
                  <p>Invoice No.</p>
                  <p className="text-lg font-bold break-all">{order.id}</p>
                </div>
                <div className="bg-blue-600 py-2 px-2 rounded">
                  <p>Issue date</p>
                  <p className="text-lg font-bold">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-800 py-2 px-2 rounded">
                  <p>Total</p>
                  <p className="text-lg font-bold">
                    {order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Item Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm mb-6 min-w-[500px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left">
                        Description
                      </th>
                      <th className="border px-4 py-2 text-center">Quantity</th>
                      <th className="border px-4 py-2 text-right">
                        Unit Price ($)
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Amount ($)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-4 py-2">{item.title}</td>
                        <td className="border px-4 py-2 text-center">
                          {item.quantity}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {item.price.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right text-base sm:text-lg font-bold mb-8">
                Total : ${order.totalAmount.toFixed(2)}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end text-sm mt-12 gap-6">
                <div>
                  <p>
                    <strong>Issued by, signature:</strong>
                  </p>
                  <p className="text-2xl font-signature mt-4">Tech Element</p>
                </div>
                <div className="text-right leading-tight text-sm">
                  <p>Tech Element</p>
                  <p>1Lavel/Lift-16</p>
                  <p>Lily Pond Center,</p>
                  <p>3 RK Mission Rd, Dhaka 1000</p>
                  <p className="mt-1">email@yourbusinessname.co.nz</p>
                </div>
              </div>

              {/* Print Button */}
              <div className="print:hidden mt-10 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
