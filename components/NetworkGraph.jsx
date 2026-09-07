"use client";

import dynamic from "next/dynamic";
import {
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";

const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center text-sm text-white/40 sm:h-[480px] lg:h-[520px]">
        Loading network...
      </div>
    ),
  }
);

export default function NetworkGraph({
  graphSource,
  onNodeClick,
  selectedClient,
  controlRef,
}) {
  const graphRef = useRef(null);
  const containerRef = useRef(null);

  const [remountKey, setRemountKey] = useState(0);

  const [dimensions, setDimensions] = useState({
    width: 800,
    height: 520,
  });

  /*
   * ============================================================
   * Measure graph container
   * ============================================================
   */

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (!containerRef.current) return;

      const rect =
        containerRef.current.getBoundingClientRect();

      setDimensions({
        width: Math.max(
          300,
          Math.floor(rect.width)
        ),

        height: Math.max(
          300,
          Math.floor(rect.height)
        ),
      });
    };

    // Initial size
    updateSize();

    // Watch responsive changes
    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * ============================================================
   * Expose controls to parent
   * ============================================================
   */

  useNetworkControls(
    controlRef,
    graphRef,
    setRemountKey
  );

  /*
   * ============================================================
   * Graph data
   * ============================================================
   */

  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];

    /*
     * ----------------------------------------------------------
     * RM
     * ----------------------------------------------------------
     */

    nodes.push({
      id: "rm",
      name: graphSource?.user || "RM",
      type: "rm",
      size: 18,
    });

    /*
     * ----------------------------------------------------------
     * Clients
     * ----------------------------------------------------------
     */

    const clients =
      graphSource?.clientsNeedingAttention?.cards || [];

    clients.slice(0, 8).forEach(
      (client, index) => {
        const id =
          client.name
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") ||
          `client-${index}`;

        /*
         * Client size
         */

        let size = 10;

        try {
          if (client.aum) {
            const match =
              client.aum.match(/[0-9.]+/);

            if (match) {
              const value =
                parseFloat(match[0]);

              if (!Number.isNaN(value)) {
                size = Math.max(
                  7,
                  Math.min(
                    15,
                    Math.round(value * 1.5)
                  )
                );
              }
            }
          }
        } catch (error) {
          size = 10;
        }

        /*
         * Client node
         */

        nodes.push({
          id,
          name: client.name,
          type: "client",
          size,
        });

        /*
         * RM -> Client
         */

        links.push({
          source: "rm",
          target: id,
        });

        /*
         * ------------------------------------------------------
         * Placeholder holdings
         *
         * Replace these with actual holdings from JSON
         * when available.
         * ------------------------------------------------------
         */

        const equityId =
          `${id}-equity`;

        const mutualId =
          `${id}-mutual`;

        nodes.push({
          id: equityId,
          name: "EQ",
          type: "equity",
          size: 4,
        });

        nodes.push({
          id: mutualId,
          name: "MF",
          type: "mutual",
          size: 5,
        });

        /*
         * Client -> Holdings
         */

        links.push({
          source: id,
          target: equityId,
        });

        links.push({
          source: id,
          target: mutualId,
        });
      }
    );

    return {
      nodes,
      links,
    };
  }, [graphSource]);

  /*
   * ============================================================
   * Node colors
   * ============================================================
   */

  const getColor = (type) => {
    switch (type) {
      case "rm":
        return "#f3a33b";

      case "client":
        return "#35bce8";

      case "equity":
        return "#35bce8";

      case "debt":
        return "#3bd0a4";

      case "mutual":
        return "#b57be8";

      case "reit":
        return "#f3b634";

      default:
        return "#aaaaaa";
    }
  };

  /*
   * ============================================================
   * Fit graph safely
   * ============================================================
   */

  const fitGraph = (delay = 150) => {
    setTimeout(() => {
      if (!graphRef.current) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!graphRef.current) return;

          graphRef.current.zoomToFit(
            600,
            30
          );
        });
      });
    }, delay);
  };

  /*
   * ============================================================
   * Re-fit after dimensions change
   * ============================================================
   */

  useEffect(() => {
    if (!graphRef.current) return;

    if (
      dimensions.width <= 0 ||
      dimensions.height <= 0
    ) {
      return;
    }

    fitGraph(200);
  }, [
    dimensions.width,
    dimensions.height,
  ]);

  /*
   * ============================================================
   * Re-fit when graph data changes
   * ============================================================
   */

  useEffect(() => {
    if (!graphRef.current) return;

    fitGraph(300);
  }, [graphData]);

  /*
   * ============================================================
   * Render
   * ============================================================
   */

  return (
    <div
      ref={containerRef}
      className="
        network-graph
        relative
        h-[420px]
        w-full
        overflow-hidden
        rounded-2xl
        sm:h-[480px]
        lg:h-[520px]
      "
      style={{
        /*
         * Allow normal page scrolling.
         */
        overscrollBehavior: "auto",
      }}
    >
      <ForceGraph2D
        key={remountKey}
        ref={graphRef}
        graphData={graphData}

        /*
         * Explicit dimensions.
         *
         * This prevents incorrect positioning
         * during page refresh.
         */

        width={dimensions.width}
        height={dimensions.height}

        backgroundColor="#24102f"

        /*
         * IMPORTANT
         *
         * Mouse wheel will NOT zoom graph.
         * It can therefore be used for page scrolling.
         */

        enableZoomInteraction={false}

        minZoom={0.5}
        maxZoom={5}

        /*
         * ======================================================
         * Force configuration
         * ======================================================
         */

        linkDistance={260}

        d3AlphaDecay={0.01}

        d3VelocityDecay={0.2}

        cooldownTicks={300}

        /*
         * ======================================================
         * Links
         * ======================================================
         */

        linkColor={() =>
          "rgba(180, 150, 200, 0.35)"
        }

        linkWidth={1}

        /*
         * ======================================================
         * Simulation finished
         * ======================================================
         */

        onEngineStop={() => {
          if (!graphRef.current) return;

          const graph =
            graphRef.current;

          /*
           * Link distance
           */

          const linkForce =
            graph.d3Force("link");

          if (linkForce) {
            linkForce.distance(260);
          }

          /*
           * Node repulsion
           */

          const chargeForce =
            graph.d3Force("charge");

          if (chargeForce) {
            chargeForce.strength(-500);
          }

          /*
           * IMPORTANT:
           *
           * Wait for browser layout before
           * calculating graph position.
           */

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setTimeout(() => {
                if (!graphRef.current) {
                  return;
                }

                graphRef.current.zoomToFit(
                  600,
                  30
                );
              }, 100);
            });
          });
        }}

        /*
         * ======================================================
         * Node rendering
         * ======================================================
         */

        nodeCanvasObject={(
          node,
          ctx,
          globalScale
        ) => {
          /*
           * Small node circles
           */

          const radius =
            Math.max(
              2,
              (node.size || 2) * 0.6
            );

          /*
           * Ignore nodes before coordinates exist
           */

          if (
            typeof node.x !== "number" ||
            typeof node.y !== "number"
          ) {
            return;
          }

          /*
           * Circle
           */

          ctx.beginPath();

          ctx.arc(
            node.x,
            node.y,
            radius,
            0,
            2 * Math.PI
          );

          ctx.fillStyle =
            getColor(node.type);

          ctx.fill();

          /*
           * RM outer ring
           */

          if (node.type === "rm") {
            ctx.beginPath();

            ctx.arc(
              node.x,
              node.y,
              radius + 3,
              0,
              2 * Math.PI
            );

            ctx.strokeStyle =
              "rgba(255,255,255,0.65)";

            ctx.lineWidth = 2;

            ctx.stroke();
          }

          /*
           * Labels
           */

          if (globalScale > 0.7) {
            const fontSize =
              Math.max(
                7,
                Math.min(
                  12,
                  11 / globalScale
                )
              );

            ctx.font =
              `${fontSize}px Arial`;

            ctx.textAlign = "center";

            ctx.textBaseline = "top";

            ctx.fillStyle =
              "rgba(255,255,255,0.78)";

            ctx.fillText(
              node.name,
              node.x,
              node.y + radius + 5
            );
          }
        }}

        /*
         * ======================================================
         * Node click
         * ======================================================
         */

        onNodeClick={(node) => {
          /*
           * Tell parent which node was clicked
           */

          if (onNodeClick) {
            onNodeClick(node);
          }

          /*
           * Safely center clicked node
           */

          if (
            !graphRef.current ||
            !node ||
            typeof node.x !== "number" ||
            typeof node.y !== "number"
          ) {
            return;
          }

          graphRef.current.centerAt(
            node.x,
            node.y,
            400
          );
        }}
      />
    </div>
  );
}

/*
 * ============================================================
 * Network Controls Hook
 * ============================================================
 */

export function useNetworkControls(
  controlRef,
  internalRef,
  setRemountKey
) {
  useEffect(() => {
    if (!controlRef) return;

    controlRef.current = {
      /*
       * ========================================================
       * Zoom In
       * ========================================================
       */

      zoomIn: (ms = 400) => {
        try {
          if (!internalRef.current) {
            return;
          }

          const currentZoom =
            internalRef.current.zoom();

          const nextZoom =
            Math.min(
              currentZoom * 1.4,
              5
            );

          internalRef.current.zoom(
            nextZoom,
            ms
          );
        } catch (error) {}
      },

      /*
       * ========================================================
       * Zoom Out
       * ========================================================
       */

      zoomOut: (ms = 400) => {
        try {
          if (!internalRef.current) {
            return;
          }

          const currentZoom =
            internalRef.current.zoom();

          const nextZoom =
            Math.max(
              currentZoom / 1.4,
              0.5
            );

          internalRef.current.zoom(
            nextZoom,
            ms
          );
        } catch (error) {}
      },

      /*
       * ========================================================
       * Reset
       * ========================================================
       */

      reset: (ms = 500) => {
        try {
          if (!internalRef.current) {
            return;
          }

          internalRef.current.zoomToFit(
            ms,
            30
          );
        } catch (error) {}
      },

      /*
       * ========================================================
       * Refresh
       * ========================================================
       */

      refresh: () => {
        setRemountKey(
          (key) => key + 1
        );
      },
    };

    /*
     * Cleanup
     */

    return () => {
      if (controlRef) {
        controlRef.current = null;
      }
    };
  }, [
    controlRef,
    internalRef,
    setRemountKey,
  ]);
}