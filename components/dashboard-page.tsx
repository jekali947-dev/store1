"use client"

import { Star, TrendingUp } from "lucide-react"
import { WaterDroplets } from "@/components/water-droplets"
import type { StoreData } from "@/lib/store-data"

interface DashboardPageProps {
  data: StoreData & { storeInfo?: { logo?: string } }
  onToggleStatus: () => void
  onNavigate: (page: string) => void
}

export function DashboardPage({ data, onToggleStatus, onNavigate }: DashboardPageProps) {
  const recentOrders = data.recentOrders.slice(0, 5)

  const logoUrl = data.storeInfo?.logo

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Background Image - fully visible */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: logoUrl ? `url(${logoUrl})` : "url('/images/bike.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Water Droplets Animation Layer */}
      <WaterDroplets />

      {/* Glass Header Panel */}
      <div 
        className="px-4 pt-5 pb-4 shrink-0 relative z-10"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          background: "rgba(255, 255, 255, 0.08)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Store name + Revenue row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-lg">{data.storeName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-white/80">Store Status</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <button
                id="storeStatusToggle"
                onClick={onToggleStatus}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${data.storeStatus ? "bg-[#22c55e]" : "bg-white/30"
                  }`}
                role="switch"
                aria-checked={data.storeStatus}
                aria-label="Toggle store status"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${data.storeStatus ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
              <span className={`text-sm font-medium flex items-center gap-1 ${data.storeStatus ? "text-[#22c55e]" : "text-red-400"}`}>
                <span className={`w-2 h-2 rounded-full ${data.storeStatus ? "bg-[#22c55e]" : "bg-red-400"}`} />
                {data.storeStatus ? "Open" : "Closed"}
              </span>
            </div>
          </div>
          <div 
            id="revenueTodayCard" 
            className="rounded-xl px-4 py-3 text-right"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <p className="text-xs text-white/80">Store Revenue Today</p>
            <p className="text-xl font-bold text-white">ZMW {data.revenueToday.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <div className="flex items-center justify-end gap-1 text-[#22c55e]">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">+12%</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div 
            id="ordersTodayCard" 
            className="rounded-xl p-3 transition-transform duration-200 active:scale-95"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <p className="text-xs text-white/80">Orders Today</p>
            <p className="text-2xl font-bold text-white mt-1">{data.ordersToday}</p>
            <p className="text-[10px] text-white/60 mt-0.5">
              {data.completedOrders} Completed / {data.pendingOrders} Pending
            </p>
          </div>
          <div 
            id="pendingOrdersCard" 
            className="rounded-xl p-3 transition-transform duration-200 active:scale-95"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <p className="text-xs text-white/80">Pending Orders</p>
            <p className="text-2xl font-bold text-[#f97316] mt-1">{data.pendingOrders}</p>
            <p className="text-[10px] text-white/60 mt-0.5">Action Needed</p>
          </div>
          <div 
            id="totalRevenueCard" 
            className="rounded-xl p-3 transition-transform duration-200 active:scale-95"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <p className="text-xs text-white/80">Total Revenue</p>
            <p className="text-xl font-bold text-[#22c55e] mt-1">
              ZMW {data.weeklyRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-white/60 mt-0.5">This Week</p>
          </div>
          <div 
            id="customerRatingCard" 
            className="rounded-xl p-3 transition-transform duration-200 active:scale-95"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <p className="text-xs text-white/80">Customer Rating</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-2xl font-bold text-white">{data.customerRating}</span>
              <Star className="w-5 h-5 fill-[#eab308] text-[#eab308]" />
            </div>
            <p className="text-[10px] text-white/60 mt-0.5">{data.totalReviews} Reviews</p>
          </div>
        </div>

        {/* Recent Orders Header */}
        <div className="flex items-center justify-between mt-4 mb-2">
          <h2 className="text-base font-bold text-white drop-shadow-lg">Recent Orders</h2>
          <button
            id="viewAllOrdersButton"
            onClick={() => onNavigate("orders")}
            className="text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
          >
            View All
          </button>
        </div>
      </div>

      {/* Scrollable Recent Orders */}
      <div 
        id="recentOrdersList" 
        className="flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide relative z-10"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          background: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="flex flex-col gap-3 pt-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl p-3 flex items-center gap-3 transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              <img
                src={order.image}
                alt={`Order ${order.id}`}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{order.id}</p>
                <p className="text-xs text-white/70">{order.customerName}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-white">
                  ZMW {order.price.toFixed(2)}
                </p>
                <p className="text-xs text-white/70">{order.time}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-[#f97316]/15", text: "text-[#f97316]", label: "Pending" },
    accepted: { bg: "bg-primary/15", text: "text-primary", label: "Accepted" },
    completed: { bg: "bg-[#22c55e]/15", text: "text-[#22c55e]", label: "Completed" },
  }
  const c = config[status] || config.pending
  return (
    <span className={`${c.bg} ${c.text} text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap`}>
      {c.label}
    </span>
  )
}
