import Link from "next/link";
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "normal" | "outline" | "delete" | "update";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Style du bouton
  isLoading?: boolean; // Indicateur de chargement
  icon?: React.ReactNode; // Icône optionnelle
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  href: string;
}

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string; // Style du bouton
  isValid: boolean; // Indicateur de chargement
  isSubmitting: boolean; // Icône optionnelle
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  icon,
  disabled,
  ...rest
}) => {
  const buttonClass = `btn btn-${variant} ${
    disabled || isLoading ? "btn-disabled" : ""
  }`;

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading} // Désactive le bouton si `disabled` ou `isLoading`
      {...rest}
    >
      {/* Icône ou chargement */}
      {isLoading ? (
        <span className="btn-spinner">...</span>
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      {children}
    </button>
  );
};

export const LinkButon: React.FC<LinkButtonProps> = ({
  children,
  href,
  variant = "primary",
  ...rest
}) => {
  const buttonClass = `btn btn-${variant}`;

  return (
    <Link className={buttonClass} href={href} {...rest}>
      {children}
    </Link>
  );
};

export function FormButton(props: FormButtonProps) {
  const { text, isValid, isSubmitting } = props;
  return (
    <div className="formButton">
      <button
        className="btn"
        disabled={isValid ? (isSubmitting ? true : false) : true}
        type="submit"
      >
        {isSubmitting ? "...." : text}
      </button>
    </div>
  );
}
