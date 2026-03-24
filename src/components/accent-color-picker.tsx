"use client";

import { ACCENT_PRESETS, usePreferences } from "@/lib/preferences";

export function AccentColorPicker() {
  const { accentColor, setAccentColor } = usePreferences();

  return (
    <div className="flex gap-2 flex-wrap">
      {ACCENT_PRESETS.map((preset) => (
        <button
          key={preset.value}
          onClick={() => setAccentColor(preset.value)}
          className="w-7 h-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110"
          style={{
            backgroundColor: preset.value,
            borderColor:
              accentColor === preset.value
                ? "#fff"
                : "rgba(255,255,255,0.1)",
            boxShadow:
              accentColor === preset.value
                ? `0 0 8px ${preset.value}60`
                : "none",
          }}
          title={preset.name}
          aria-label={`Set accent color to ${preset.name}`}
        />
      ))}
    </div>
  );
}
