"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { type ChartConfig, ChartContext } from "./use-chart"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> &
    VariantProps<typeof chartVariants> & {
      config: ChartConfig
      children: React.ComponentPropsWithoutRef<"div">["children"]
    }
>(({ config, className, children, ...props }, ref) => {
  const uniqueId = React.useId()
  const id = React.useMemo(() => `chart-${uniqueId}`, [uniqueId])
  return (
    <ChartContext.Provider value={{ config, id }}>
      <div ref={ref} className={cn("flex aspect-video justify-center text-foreground", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ ...props }: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "absolute hidden h-fit w-fit rounded-lg border bg-white px-2 py-1 text-xs text-slate-950 shadow-md data-[state=active]:block dark:bg-slate-950 dark:text-slate-50",
        props.className,
      )}
      {...props}
    />
  )
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideIndicator?: boolean
    indicator?: "dot" | "line"
    nameKey?: string
  }
>(({ hideIndicator = false, indicator = "dot", nameKey, children, ...props }, ref) => {
  const { config } = useChart()
  const id = React.useId()

  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-2 text-xs", props.className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child
        }

        const name = nameKey ? (child.props as any)[nameKey] : (child.props as any).name

        const color = (child.props as any).color as keyof ChartConfig

        return (
          <div key={id} className="flex items-center gap-2">
            {!hideIndicator && (
              <div
                className={cn("h-2 w-2 shrink-0 rounded-full", {
                  "w-1.5 flex-1 rounded-lg": indicator === "line",
                })}
                style={{
                  backgroundColor: config[color]?.color,
                }}
              />
            )}
            {name && <span className="text-muted-foreground">{name}</span>}
            {child}
          </div>
        )
      })}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideIndicator?: boolean
    indicator?: "dot" | "line"
  }
>(({ hideIndicator = false, indicator = "dot", className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props} />
))
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideIndicator?: boolean
    indicator?: "dot" | "line"
    nameKey?: string
  }
>(({ hideIndicator = false, indicator = "dot", nameKey, children, ...props }, ref) => {
  const { config } = useChart()
  const id = React.useId()

  return (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", props.className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child
        }

        const name = nameKey ? (child.props as any)[nameKey] : (child.props as any).name

        const color = (child.props as any).color as keyof ChartConfig

        return (
          <div key={id} className="flex items-center gap-1.5">
            {!hideIndicator && (
              <div
                className={cn("h-2 w-2 shrink-0 rounded-full", {
                  "w-1.5 flex-1 rounded-lg": indicator === "line",
                })}
                style={{
                  backgroundColor: config[color]?.color,
                }}
              />
            )}
            {name && <span className="text-muted-foreground">{name}</span>}
            {child}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

const ChartCrosshair = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)} {...props} />
  )
}

const ChartCrosshairContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    hideIndicator?: boolean
    indicator?: "dot" | "line"
    nameKey?: string
  }
>(({ hideIndicator = false, indicator = "dot", nameKey, children, ...props }, ref) => {
  const { config } = useChart()
  const id = React.useId()

  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-2 text-xs", props.className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child
        }

        const name = nameKey ? (child.props as any)[nameKey] : (child.props as any).name

        const color = (child.props as any).color as keyof ChartConfig

        return (
          <div key={id} className="flex items-center gap-2">
            {!hideIndicator && (
              <div
                className={cn("h-2 w-2 shrink-0 rounded-full", {
                  "w-1.5 flex-1 rounded-lg": indicator === "line",
                })}
                style={{
                  backgroundColor: config[color]?.color,
                }}
              />
            )}
            {name && <span className="text-muted-foreground">{name}</span>}
            {child}
          </div>
        )
      })}
    </div>
  )
})
ChartCrosshairContent.displayName = "ChartCrosshairContent"

const ChartCrosshairLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLabel.displayName = "ChartCrosshairLabel"

const ChartCrosshairLine = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLine.displayName = "ChartCrosshairLine"

const ChartCrosshairPoint = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairPoint.displayName = "ChartCrosshairPoint"

const ChartCrosshairTrigger = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairTrigger.displayName = "ChartCrosshairTrigger"

const ChartCrosshairVertical = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairVertical.displayName = "ChartCrosshairVertical"

const ChartCrosshairHorizontal = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairHorizontal.displayName = "ChartCrosshairHorizontal"

const ChartCrosshairRect = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRect.displayName = "ChartCrosshairRect"

const ChartCrosshairCircle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircle.displayName = "ChartCrosshairCircle"

const ChartCrosshairLineVertical = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineVertical.displayName = "ChartCrosshairLineVertical"

const ChartCrosshairLineHorizontal = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineHorizontal.displayName = "ChartCrosshairLineHorizontal"

const ChartCrosshairRectVertical = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectVertical.displayName = "ChartCrosshairRectVertical"

const ChartCrosshairRectHorizontal = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectHorizontal.displayName = "ChartCrosshairRectHorizontal"

const ChartCrosshairCircleVertical = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleVertical.displayName = "ChartCrosshairCircleVertical"

const ChartCrosshairCircleHorizontal = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleHorizontal.displayName = "ChartCrosshairCircleHorizontal"

const ChartCrosshairLineVerticalLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineVerticalLabel.displayName = "ChartCrosshairLineVerticalLabel"

const ChartCrosshairLineHorizontalLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineHorizontalLabel.displayName = "ChartCrosshairLineHorizontalLabel"

const ChartCrosshairRectVerticalLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectVerticalLabel.displayName = "ChartCrosshairRectVerticalLabel"

const ChartCrosshairRectHorizontalLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectHorizontalLabel.displayName = "ChartCrosshairRectHorizontalLabel"

const ChartCrosshairCircleVerticalLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleVerticalLabel.displayName = "ChartCrosshairCircleVerticalLabel"

const ChartCrosshairCircleHorizontalLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleHorizontalLabel.displayName = "ChartCrosshairCircleHorizontalLabel"

const ChartCrosshairLineVerticalValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineVerticalValue.displayName = "ChartCrosshairLineVerticalValue"

const ChartCrosshairLineHorizontalValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineHorizontalValue.displayName = "ChartCrosshairLineHorizontalValue"

const ChartCrosshairRectVerticalValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectVerticalValue.displayName = "ChartCrosshairRectVerticalValue"

const ChartCrosshairRectHorizontalValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectHorizontalValue.displayName = "ChartCrosshairRectHorizontalValue"

const ChartCrosshairCircleVerticalValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleVerticalValue.displayName = "ChartCrosshairCircleVerticalValue"

const ChartCrosshairCircleHorizontalValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleHorizontalValue.displayName = "ChartCrosshairCircleHorizontalValue"

const ChartCrosshairLineVerticalLabelValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineVerticalLabelValue.displayName = "ChartCrosshairLineVerticalLabelValue"

const ChartCrosshairLineHorizontalLabelValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairLineHorizontalLabelValue.displayName = "ChartCrosshairLineHorizontalLabelValue"

const ChartCrosshairRectVerticalLabelValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectVerticalLabelValue.displayName = "ChartCrosshairRectVerticalLabelValue"

const ChartCrosshairRectHorizontalLabelValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairRectHorizontalLabelValue.displayName = "ChartCrosshairRectHorizontalLabelValue"

const ChartCrosshairCircleVerticalLabelValue = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ),
)
ChartCrosshairCircleVerticalLabelValue.displayName = "ChartCrosshairCircleVerticalLabelValue"

const ChartCrosshairCircleHorizontalLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValue.displayName = "ChartCrosshairCircleHorizontalLabelValue"

const ChartCrosshairLineVerticalLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePoint.displayName = "ChartCrosshairLineVerticalLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePoint.displayName = "ChartCrosshairLineHorizontalLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePoint.displayName = "ChartCrosshairRectVerticalLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePoint.displayName = "ChartCrosshairRectHorizontalLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePoint.displayName = "ChartCrosshairCircleVerticalLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePoint.displayName = "ChartCrosshairCircleHorizontalLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLine.displayName = "ChartCrosshairLineVerticalLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLine.displayName = "ChartCrosshairLineHorizontalLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLine.displayName = "ChartCrosshairRectVerticalLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLine.displayName = "ChartCrosshairRectHorizontalLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLine.displayName = "ChartCrosshairCircleVerticalLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLine.displayName = "ChartCrosshairCircleHorizontalLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabel.displayName = "ChartCrosshairLineVerticalLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabel.displayName = "ChartCrosshairRectVerticalLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
    {...props}
  />
))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePoint"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLine"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairRectHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel.displayName =
  "ChartCrosshairCircleHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabel"

const ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName =
  "ChartCrosshairLineHorizontalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue"

const ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue =
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 hidden h-full w-full data-[state=active]:block", className)}
      {...props}
    />
  ))
\
ChartCrosshairRectVerticalLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValuePointLineLabelValue.displayName = "ChartCrosshairRectVerticalLabelValuePoint
