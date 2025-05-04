import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import * as DialogPrimitive from "@rn-primitives/dialog";
import { X } from "~/lib/icons/X";
import { cn } from "~/lib/utils";

// Re-export the base Dialog components
export {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

// Create a custom DialogOverlay for the bottom dialog
const BottomDialogOverlayNative = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      style={StyleSheet.absoluteFill}
      className={cn(
        "flex bg-black/80 justify-end items-center pb-32",
        className
      )}
      {...props}
      ref={ref}
    >
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
      >
        <>{children}</>
      </Animated.View>
    </DialogPrimitive.Overlay>
  );
});

BottomDialogOverlayNative.displayName = "BottomDialogOverlayNative";

const BottomDialogOverlayWeb = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps
>(({ className, ...props }, ref) => {
  const { open } = DialogPrimitive.useRootContext();
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "bg-black/80 flex justify-end items-center absolute top-0 right-0 bottom-0 left-0",
        open
          ? "web:animate-in web:fade-in-0"
          : "web:animate-out web:fade-out-0",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});

BottomDialogOverlayWeb.displayName = "BottomDialogOverlayWeb";

const BottomDialogOverlay = Platform.select({
  web: BottomDialogOverlayWeb,
  default: BottomDialogOverlayNative,
});

// Create a custom DialogContent for the bottom dialog
export const BottomDialogContent = React.forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, portalHost, ...props }, ref) => {
  const { open } = DialogPrimitive.useRootContext();
  return (
    <DialogPrimitive.Portal hostName={portalHost}>
      <BottomDialogOverlay>
        <Animated.View
          style={{ width: "100%" }}
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(200)}
        >
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              "w-full bg-background p-6 shadow-lg rounded-t-xl",
              className
            )}
            {...props}
          >
            {children}
            <DialogPrimitive.Close
              className={
                "absolute right-4 top-4 p-0.5 web:group rounded-sm opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none"
              }
            >
              <X
                size={Platform.OS === "web" ? 16 : 18}
                className={cn(
                  "text-muted-foreground",
                  open && "text-accent-foreground"
                )}
              />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Animated.View>
      </BottomDialogOverlay>
    </DialogPrimitive.Portal>
  );
});

BottomDialogContent.displayName = "BottomDialogContent";
