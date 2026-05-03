import React, {
  useState
} from "react";

export function NotificationCenter() {

  const [
    notifications,
    setNotifications
  ] = useState([

    "🌾 Product uploaded successfully",

    "🛒 New order received",

    "🚚 Delivery accepted",

    "✅ Payment successful"

  ]);

  const [
    open,
    setOpen
  ] = useState(false);

  return (
    <div className="relative">

      {/* BELL */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative bg-white rounded-full p-3 shadow-md"
      >
        🔔

        {/* COUNT */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {
            notifications.length
          }
        </span>

      </button>

      {/* DROPDOWN */}
      {open && (

        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg p-4 z-50">

          <h2 className="text-xl font-bold mb-4">
            Notifications
          </h2>

          <div className="space-y-3">

            {notifications.map(
              (
                note,
                index
              ) => (

                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-3"
                >
                  {note}
                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>
  );
}