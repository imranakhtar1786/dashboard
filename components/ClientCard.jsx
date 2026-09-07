export default function ClientCard({ client }) {
  const badgeStyles = {
    red: "bg-red-50 text-red-500 border-red-200",
    green: "bg-emerald-50 text-emerald-600 border-emerald-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  const accentStyles = {
    red: "bg-red-500",
    green: "bg-emerald-500",
    yellow: "bg-yellow-500",
  };

  const accentColor =
    accentStyles[client.badgeColor] || "bg-[#24102f]";

  return (
    <article
      className="
        relative
        min-w-[245px]
        sm:min-w-[260px]
        lg:min-w-0
        w-full
        min-h-[175px]
        sm:min-h-[180px]
        lg:min-h-[185px]
        bg-white
        border border-black/5
        rounded-xl
        p-3
        flex flex-col
        overflow-hidden
      "
    >
      {/* Left Accent - 90% height, vertically centered */}
      <span
        className={`
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          h-[90%]
          w-[3px]
          rounded-r-full
          ${accentColor}
        `}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        {/* Client Info */}
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Avatar */}
          <div
            className="
              shrink-0
              w-7 h-7
              sm:w-8 sm:h-8
              rounded-full
              bg-[#24102f]
              text-white
              flex
              items-center
              justify-center
              text-[9px]
              sm:text-[10px]
              font-medium
            "
          >
            {client.initials}
          </div>

          {/* Name + AUM */}
          <div className="min-w-0">
            <h3
              className="
                text-[12px]
                sm:text-[13px]
                font-semibold
                truncate
              "
            >
              {client.name}
            </h3>

            <div
              className="
                mt-0.5
                text-[9px]
                sm:text-[10px]
                font-mono
                text-black/50
                truncate
              "
            >
              {client.aum}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {client.badge && (
          <span
            className={`
              shrink-0
              px-1.5
              py-0.5
              sm:px-2
              sm:py-1
              rounded
              border
              text-[7px]
              sm:text-[8px]
              font-mono
              tracking-wide
              whitespace-nowrap
              ${
                badgeStyles[client.badgeColor] ||
                badgeStyles.yellow
              }
            `}
          >
            {client.badge}
          </span>
        )}
      </div>

      {/* Client Note */}
      <p
        className="
          mt-4
          text-[10px]
          sm:text-[11px]
          leading-[1.45]
          text-black/60
          min-h-[52px]
          sm:min-h-[55px]
          line-clamp-3
        "
      >
        {client.note}
      </p>

      {/* Footer */}
      <div
        className="
          mt-auto
          pt-3
          flex
          items-center
          justify-between
          gap-2
          border-t
          border-black/5
        "
      >
        {/* Meta */}
        {client.meta ? (
          <span
            className="
              min-w-0
              truncate
              text-[8px]
              sm:text-[9px]
              font-mono
              text-black/35
            "
          >
            {client.meta}
          </span>
        ) : (
          <span />
        )}

        {/* CTA */}
        {client.cta && (
          <button
            type="button"
            className="
              shrink-0
              px-2.5
              py-1.5
              rounded-lg
              bg-[#f5f2ef]
              text-[9px]
              sm:text-[10px]
              font-medium
              whitespace-nowrap
              hover:bg-[#eee9e4]
              transition-colors
            "
          >
            {client.cta}
          </button>
        )}
      </div>
    </article>
  );
}