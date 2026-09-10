import { cn } from "@crm/ui/lib/utils";
import type * as React from "react";

const Logo = ({ className, alt = "", ...props }: React.ComponentProps<"img">) => (
	<img
		src="/logo.png"
		alt={alt}
		className={cn("object-contain", className)}
		{...props}
	/>
);

export default Logo;
