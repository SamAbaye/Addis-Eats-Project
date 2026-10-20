'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function RevenueChart({ data }) {
    const etb = (v) => new Intl.NumberFormat("en-ET", {
        style: "currency", currency: "ETB",
        maximumFractionDigits: 0 }).format(v);
        
    return (
        <div className="h-72">
            <ResponsiveContainer width="100%" height={300} aspect={2 / 1}>
                <BarChart data={data}>
                <YAxis tickFormatter={etb} width={90} />
                <XAxis dataKey="area" />
                <Tooltip formatter={(v) => [etb(v), "Revenue"]} />
                <Bar dataKey="revenue" fill="#1B4D8E" name="Revenue" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
