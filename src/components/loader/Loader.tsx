import { LoaderProps } from "@/interface/interface";

  export function Loader({ size = 40, borderWidth = 4, color = '#3b82f6' }: LoaderProps) {
    return (
      <div
        className="animate-spin rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${borderWidth}px solid #e5e7eb`,
          borderTop: `${borderWidth}px solid ${color}`
        }}
      />
    );
  }
  