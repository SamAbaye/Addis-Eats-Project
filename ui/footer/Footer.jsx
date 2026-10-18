import React from 'react'

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h5 className="mb-4 text-lg font-semibold tracking-wide text-amber-400">
            Hospitality Hours
          </h5>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>Tuesday – Sunday: 11:30 AM – 11:00 PM</p>
            <p>Monday: Reserved for Private Banquets</p>
            <p>Traditional Coffee Ceremony daily at 4:00 PM</p>
            <p>Jebena Buna &amp; Fresh Roasting All Evening</p>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h5 className="mb-4 text-lg font-semibold tracking-wide text-amber-400">
            Addis Location
          </h5>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>
              Bole Medhanialem, Addis Ababa &amp; express delivery across town.
            </p>
            <p>
              <a
                href="tel:+251911234567"
                className="font-medium text-white transition hover:text-amber-400"
              >
                +251 911 234 567
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-700 py-4 text-center text-xs text-stone-500">
        © © 2026 Habesha Restaurant. All rights reserved. Habesha Restaurant.
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer