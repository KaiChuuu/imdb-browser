import { useEffect, useState } from "react";

function SlideDownNotification() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-light-yellow text-black text-base-xl text-center py-5 font-medium shadow-md">
        ⚠️ First load may take ~10-50 seconds. Server is spinning up, please be
        patient! Thank you!
      </div>
    </div>
  );
}

export default SlideDownNotification;
