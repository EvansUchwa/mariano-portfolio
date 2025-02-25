import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

export const siteFastLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#about", label: "A propos" },
  { href: "/#works", label: "Travaux" },
  { href: "/#skills", label: "Skill" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function reqSuccessAlertDisplayer(res: AxiosResponse) {
  return toast.success(res.data.message);
}

export function reqErrorAlertDisplayer(err: AxiosError) {
  const errorMessage =
    (err.response?.data as { message: string })?.message ?? "An error occurred";
  return toast.error(errorMessage);
}
