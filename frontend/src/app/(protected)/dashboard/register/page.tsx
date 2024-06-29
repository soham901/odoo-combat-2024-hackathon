"use client";

import { useSearchParams } from "next/navigation";
import { DonorRegisterForm, NonProfitRegisterForm } from "./forms";

const options = [
  {
    label: "Donor",
    value: "donor",
    form: DonorRegisterForm,
  },
  {
    label: "Non Profit",
    value: "nonprofit",
    form: NonProfitRegisterForm,
  },
];

export default function RegisterDonor() {
  const searchParams = useSearchParams();

  const as = searchParams.get("as") || options[0].value;

  const curOption = options.filter((o) => o.value === as)[0];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-2xl font-semibold">Create a profile</div>
        <div className="text-sm text-muted-foreground">
          Create your {curOption.label} profile
        </div>
      </div>
      <div className="w-full sm:w-[36rem]">
        {curOption.form && <curOption.form />}
      </div>
    </div>
  );
}
