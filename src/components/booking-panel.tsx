"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@/components/icons";
import type { Branch } from "@/data/content";

type BookingPanelProps = {
  branches: readonly Branch[];
  bookingUrl: string | null;
};

export function BookingPanel({ branches, bookingUrl }: BookingPanelProps) {
  const [selectedBranchId, setSelectedBranchId] = useState(
    branches[0]?.id ?? "",
  );
  const selectedBranch = useMemo(
    () =>
      branches.find((branch) => branch.id === selectedBranchId) ?? branches[0],
    [branches, selectedBranchId],
  );

  if (!selectedBranch) {
    return (
      <div className="booking-selector booking-selector--empty">
        <p className="booking-selector__label">Онлайн-запись</p>
        <div className="booking-selector__empty-state">
          <p className="booking-selector__empty-kicker">Скоро</p>
          <h3 className="booking-selector__empty-title">
            Здесь откроется форма записи.
          </h3>
          <p className="booking-selector__empty-description">
            После подключения данных можно будет выбрать услугу, мастера,
            адрес и удобное время.
          </p>

          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="button-dark booking-selector__submit"
            >
              <span>Открыть онлайн-запись</span>
              <ArrowUpRightIcon className="button-dark__icon" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="button-dark booking-selector__submit"
            >
              <span>Запись скоро откроется</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const selectedBookingUrl = selectedBranch.bookingUrl ?? bookingUrl;

  return (
    <div className="booking-selector">
      <div className="booking-selector__field">
        <label htmlFor="booking-branch" className="booking-selector__label">
          Выберите филиал
        </label>
        <div className="booking-selector__control">
          <select
            id="booking-branch"
            value={selectedBranchId}
            onChange={(event) => setSelectedBranchId(event.target.value)}
            className="booking-selector__select"
          >
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.city} / {branch.address}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="booking-selector__chevron" />
        </div>
      </div>

      <div aria-live="polite" className="booking-selector__location">
        <MapPinIcon className="booking-selector__pin" />
        <div>
          <p className="booking-selector__name">{selectedBranch.name}</p>
          <p className="booking-selector__address">
            {selectedBranch.city}, {selectedBranch.address}
          </p>
        </div>
        {selectedBranch.phone ? (
          <a
            href={selectedBranch.phone.href}
            className="booking-selector__phone"
          >
            {selectedBranch.phone.label}
          </a>
        ) : null}
      </div>

      <div className="booking-selector__actions">
        {selectedBookingUrl ? (
          <a
            href={selectedBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="button-dark booking-selector__submit"
          >
            <span>Открыть онлайн-запись</span>
            <ArrowUpRightIcon className="button-dark__icon" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="button-dark booking-selector__submit"
          >
            <span>Запись скоро откроется</span>
          </button>
        )}
        <p className="booking-selector__reassurance">
          Без звонка / в удобное время
        </p>
      </div>

      <p className="booking-selector__disclaimer">
        Контакты и ссылки записи добавляются в единый контентный слой после
        подтверждения данных.
      </p>
    </div>
  );
}
