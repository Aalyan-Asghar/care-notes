import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="pt-[30px] px-[40px]">
          <div className="flex justify-between px-[80px] pb-[30px] border-b border-gray-300 items-center">
            <h1 className="text-[40px] font-bold">Care Notes</h1>
            <div>
              <label className="border border-gray-300 focus:outline-none rounded p-[10px]">
                Filter by Resident
                <select id="select" name="select" className="focus:outline-none rounded">
                  <option value="today">Today</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
