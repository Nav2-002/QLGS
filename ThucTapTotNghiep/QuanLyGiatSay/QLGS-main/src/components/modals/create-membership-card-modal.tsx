import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createMembershipCard } from "@/api/membership-card.api";
import { CreateMemberShipCardRequestType } from "@/types/membership-card.type";
import { toast } from "sonner";
import { getAllCustomers } from "@/api/customer.api";
import { CustomerResponse } from "@/types/customer.type";
import { useEffect } from "react";

interface CreateMembershipCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateMembershipCardModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateMembershipCardModalProps) {
  const [formData, setFormData] = useState<CreateMemberShipCardRequestType>({
    id_customer: "",
    card_number: "",
    issue_date: new Date(),
    expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    points: 0,
    status: true,
  });

  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [dateError, setDateError] = useState("");
  const [customersLoading, setCustomersLoading] = useState(false);

  // Fetch customers for dropdown
  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
    }
  }, [isOpen]);

  const fetchCustomers = async () => {
    setCustomersLoading(true);
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customers. Please try again.");
    }
    setCustomersLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Card number validation
    if (name === "card_number") {
      if (!value) {
        setCardNumberError("Card number is required");
      } else if (!/^[A-Z0-9]{8,}$/.test(value)) {
        setCardNumberError(
          "Card number must be at least 8 alphanumeric characters (uppercase)"
        );
      } else {
        setCardNumberError("");
      }
    }

    // Date validation
    if (name === "expiry_date") {
      const expiryDate = new Date(value);
      const issueDate = formData.issue_date;

      if (expiryDate <= issueDate) {
        setDateError("Expiry date must be after issue date");
      } else {
        setDateError("");
      }
    }

    if (name === "issue_date") {
      const issueDate = new Date(value);
      const expiryDate = formData.expiry_date;

      if (expiryDate <= issueDate) {
        setDateError("Expiry date must be after issue date");
      } else {
        setDateError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "issue_date" || name === "expiry_date"
          ? new Date(value)
          : name === "points"
          ? parseInt(value, 10)
          : name === "status"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields before submission
    let hasError = false;

    if (!formData.id_customer) {
      setError("Please select a customer");
      hasError = true;
    }

    if (!formData.card_number || !/^[A-Z0-9]{8,}$/.test(formData.card_number)) {
      setCardNumberError(
        "Card number must be at least 8 alphanumeric characters (uppercase)"
      );
      hasError = true;
    }

    if (formData.expiry_date <= formData.issue_date) {
      setDateError("Expiry date must be after issue date");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createMembershipCard(formData);
      setLoading(false);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        id_customer: "",
        card_number: "",
        issue_date: new Date(),
        expiry_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        points: 0,
        status: true,
      });
      toast.success("Membership card created successfully!");
    } catch (error) {
      console.error("Error creating membership card:", error);
      setError("Failed to create membership card. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Membership Card</DialogTitle>
            <DialogDescription>
              Enter the details for the new membership card. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_customer" className="text-right">
                Customer
              </Label>
              <select
                id="id_customer"
                name="id_customer"
                value={formData.id_customer}
                onChange={handleChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={customersLoading}
                required
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="card_number" className="text-right">
                Card Number
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="card_number"
                  name="card_number"
                  value={formData.card_number}
                  onChange={handleChange}
                  className={cardNumberError ? "border-destructive" : ""}
                  placeholder="e.g. CARD12345"
                  required
                />
                {cardNumberError && (
                  <p className="text-xs text-destructive">{cardNumberError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issue_date" className="text-right">
                Issue Date
              </Label>
              <Input
                id="issue_date"
                name="issue_date"
                type="date"
                value={formData.issue_date.toISOString().split("T")[0]}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry_date" className="text-right">
                Expiry Date
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="expiry_date"
                  name="expiry_date"
                  type="date"
                  value={formData.expiry_date.toISOString().split("T")[0]}
                  onChange={handleChange}
                  className={dateError ? "border-destructive" : ""}
                  required
                />
                {dateError && (
                  <p className="text-xs text-destructive">{dateError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="points" className="text-right">
                Points
              </Label>
              <Input
                id="points"
                name="points"
                type="number"
                min="0"
                value={formData.points}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                name="status"
                value={formData.status.toString()}
                onChange={handleChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !!cardNumberError || !!dateError}
            >
              {loading ? "Creating..." : "Create Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
