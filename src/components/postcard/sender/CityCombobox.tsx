"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Search, MapPin, ChevronDown, Check, Edit3 } from "lucide-react";
import { searchCities, POPULAR_CITIES, type CityItem } from "@/lib/cities";
import { cn } from "@/lib/utils";

export interface CityComboboxProps {
  value: string;
  onChange: (city: string, cityObj?: CityItem | null) => void;
  error?: string;
  onBlur?: () => void;
}

export function CityCombobox({ value, onChange, error, onBlur }: CityComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isManual, setIsManual] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const filteredCities = searchCities(searchQuery);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  useEffect(() => {
    if (isOpen && !isManual) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, isManual]);

  function handleSelectCity(city: CityItem) {
    onChange(city.name, city);
    setIsOpen(false);
    setSearchQuery("");
  }

  function handleSwitchToManual() {
    setIsManual(true);
    setIsOpen(false);
    onChange("", null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCities.length + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCities.length + 1) % (filteredCities.length + 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex < filteredCities.length) {
        handleSelectCity(filteredCities[selectedIndex]);
      } else {
        handleSwitchToManual();
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {isManual ? (
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value, null)}
            onBlur={onBlur}
            placeholder="Enter city manually..."
            maxLength={60}
            className={cn(
              "field-vintage w-full font-handwritten text-base px-3 py-2.5 rounded-md outline-none transition-all leading-relaxed h-[44px] sm:h-[44px]",
              error ? "border-red-600 bg-red-50/40" : "border-[var(--border)] bg-[#fffceb]"
            )}
            style={{ color: "var(--ink)" }}
          />
          <button
            type="button"
            onClick={() => {
              setIsManual(false);
              setIsOpen(true);
            }}
            className="absolute right-2 text-xs font-serif-vintage text-[var(--burgundy)] underline px-2 py-1 hover:opacity-80"
          >
            List
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn(
            "field-vintage w-full font-handwritten text-base px-3 py-2.5 rounded-md outline-none transition-all flex items-center justify-between gap-2 text-left cursor-pointer h-[44px] sm:h-[44px]",
            error ? "border-red-600 bg-red-50/40" : "border-[var(--border)] bg-[#fffceb]"
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <MapPin className="w-4 h-4 shrink-0 text-[var(--burgundy)] opacity-80" />
            <span
              className={cn("truncate", !value && "text-[var(--ink-soft)] opacity-70")}
              style={{ color: value ? "var(--ink)" : undefined }}
            >
              {value || "Search city..."}
            </span>
          </div>
          <ChevronDown className={cn("w-4 h-4 shrink-0 transition-transform text-[var(--ink-soft)]", isOpen && "rotate-180")} />
        </button>
      )}

      {error && <p className="text-xs text-red-700 mt-1 font-sans">{error}</p>}

      {isOpen && !isManual && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 z-50 rounded-md border shadow-lg vignette max-h-60 overflow-y-auto box-border styled-scroll"
          style={{
            backgroundColor: "#faf3e0",
            borderColor: "var(--border)",
          }}
        >
          <div className="p-2 border-b sticky top-0 bg-[#f5ebd2] z-10 flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
            <Search className="w-3.5 h-3.5 text-[var(--ink-soft)] shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search Indian cities..."
              className="w-full bg-transparent outline-none font-sans text-xs text-[var(--ink)] placeholder:text-[var(--ink-soft)]"
            />
          </div>

          <div className="py-1">
            {filteredCities.map((city, idx) => {
              const isSelected = value === city.name;
              const isHighlighted = selectedIndex === idx;

              return (
                <button
                  key={`${city.name}-${city.state}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCity(city)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs flex items-center justify-between transition cursor-pointer font-sans",
                    isHighlighted ? "bg-amber-200/70 text-amber-950 font-medium" : "hover:bg-amber-100/50 text-[var(--ink)]"
                  )}
                >
                  <div className="min-w-0">
                    <span className="font-semibold">{city.name}</span>
                    <span className="text-[10px] text-[var(--ink-soft)] ml-1.5 opacity-80">
                      ({city.state})
                    </span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--burgundy)] shrink-0" />}
                </button>
              );
            })}

            {filteredCities.length === 0 && (
              <div className="px-3 py-2 text-xs text-[var(--ink-soft)] italic font-sans text-center">
                No cities found matching &quot;{searchQuery}&quot;
              </div>
            )}

            <div className="border-t mt-1 pt-1 bg-[#f5ebd2]/60" style={{ borderColor: "var(--border)" }}>
              <button
                type="button"
                onClick={handleSwitchToManual}
                onMouseEnter={() => setSelectedIndex(filteredCities.length)}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs font-serif-vintage font-bold flex items-center gap-1.5 text-[var(--burgundy)] hover:bg-amber-200/80 transition cursor-pointer",
                  selectedIndex === filteredCities.length && "bg-amber-200/80"
                )}
              >
                <Edit3 className="w-3.5 h-3.5 shrink-0" />
                <span>Can&apos;t find your city? → Enter manually</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
