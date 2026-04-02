"use client";

import { IconChevronRightMedium } from "central-icons";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Type definition for a single breadcrumb item.
 */
type BreadcrumbType = {
  label: string | React.ReactNode;
  href?: string;
};

type BreadcrumbProps = {
  /** Optional override to manually specify breadcrumbs instead of deriving from the URL. */
  breadcrumbs?: BreadcrumbType[];
};

export function Breadcrumbs({ breadcrumbs = [] }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          let item: React.ReactNode;

          // If it's the last item OR if href is missing, render as a static page
          if (isLast || !breadcrumb.href) {
            item = (
              <BreadcrumbPage aria-current="page" className="select-none">
                {typeof breadcrumb.label === "string" ? (
                  breadcrumb.label
                ) : (
                  <span className="font-mono" style={{ whiteSpace: "pre" }}>
                    {breadcrumb.label}
                  </span>
                )}
              </BreadcrumbPage>
            );
          } else {
            // Intermediate items with a valid href are rendered as links
            item = (
              <BreadcrumbLink href={breadcrumb.href}>
                {breadcrumb.label}
              </BreadcrumbLink>
            );
          }

          return (
            <Fragment key={breadcrumb.href || index}>
              <BreadcrumbItem>{item}</BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <IconChevronRightMedium />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
