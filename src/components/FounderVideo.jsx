import { lazy, Suspense } from "react";

const LazyImage = lazy(() => import("./LazyImage"));

const FounderVideo = () => {
  return (
    <section className="w-full p-8 " style={{ backgroundColor: "#EDF2E4" }}>
      {/* FULL WIDTH WRAPPER */}
      <div className="w-full ">
        {/* CARD FULL WIDTH */}
        <div
          className="relative overflow-hidden w-full bg-white rounded-xl"
          style={{
            maxWidth: "100%",
          }}
        >
          <div className="flex flex-col lg:flex-row rounded-xl">
            {/* LEFT BLACK SECTION */}
            <div
              className="relative lg:w-[40%] px-8 md:px-10 py-10 flex flex-col justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            >
              {/* Blur overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(https://plus.unsplash.com/premium_photo-1757675297576-bde534eab1c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9yaXpvbnRhbCUyMGltYWdlcyUyMG9mJTIwbWVufGVufDB8fDB8fHww)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(14px)",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <p className="text-white text-lg md:text-xl leading-relaxed max-w-sm">
                  Watch our founder talk about the product and the environment.
                </p>

                <button className="mt-6 flex items-center gap-3 text-white hover:opacity-80 transition">
                  <span className="text-base md:text-lg font-medium">
                    Watch video
                  </span>

                  <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#000" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE SECTION */}
            <div className="relative lg:w-[60%]">
              <Suspense
                fallback={
                  <div className="w-full h-[400px] lg:h-[500px] bg-gray-200 animate-pulse" />
                }
              >
                <LazyImage
                  src="https://plus.unsplash.com/premium_photo-1757675297576-bde534eab1c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9yaXpvbnRhbCUyMGltYWdlcyUyMG9mJTIwbWVufGVufDB8fDB8fHww"
                  alt="Founder"
                  className="w-full h-[400px] lg:h-[500px] object-cover object-center"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderVideo;
