import { useState } from "react";
import { Calculator } from "lucide-react";

function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function EmiCalculator({ defaultAmount = 5000000 }: { defaultAmount?: number }) {
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi =
    months === 0 || rate === 0
      ? loanAmount / months
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayable = emi * months;
  const totalInterest = totalPayable - loanAmount;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-amber-600 w-5 h-5" />
        <h3 className="font-bold text-lg text-gray-900">EMI Calculator</h3>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-600 font-medium">Loan Amount</label>
            <span className="font-bold text-amber-700">{formatINR(loanAmount)}</span>
          </div>
          <input
            type="range"
            min={500000}
            max={50000000}
            step={100000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>₹5 L</span><span>₹5 Cr</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-600 font-medium">Interest Rate (p.a.)</label>
            <span className="font-bold text-amber-700">{rate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={6}
            max={15}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>6%</span><span>15%</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <label className="text-gray-600 font-medium">Loan Tenure</label>
            <span className="font-bold text-amber-700">{tenure} Years</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1 Year</span><span>30 Years</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 rounded-xl p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
          <p className="font-bold text-amber-700 text-lg">{formatINR(Math.round(emi))}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Interest</p>
          <p className="font-bold text-gray-800">{formatINR(Math.round(totalInterest))}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Total Payable</p>
          <p className="font-bold text-gray-800">{formatINR(Math.round(totalPayable))}</p>
        </div>
      </div>
    </div>
  );
}
