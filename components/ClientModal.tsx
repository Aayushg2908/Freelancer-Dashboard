"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClientModal } from "@/hooks/use-client-modal";
import { clientSchema } from "@/lib/validations/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { countries, referralSources } from "@/constants/client";
import { toast } from "sonner";
import { addClient, updateClient } from "@/actions/clients";

export const ClientModal = () => {
  const { client, type, isOpen, onClose } = useClientModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client ? client.name : "",
      email: client ? client.email : "",
      projects: client ? client.projects : "",
      country: client ? client.country : "",
      referralSource: client ? client.referralSource : "",
    },
  });

  useEffect(() => {
    if (client) {
      form.setValue("name", client.name);
      form.setValue("email", client.email);
      form.setValue("projects", client.projects);
      form.setValue("country", client.country);
      form.setValue("referralSource", client.referralSource);
    } else {
      form.reset();
    }
  }, [form, client]);

  async function onSubmit(values: z.infer<typeof clientSchema>) {
    try {
      setLoading(true);
      if (type === "Add") {
        await addClient(values);
        toast.success("Client added successfully");
      } else if (type === "Update" && client) {
        await updateClient(client.id, values);
        toast.success("Client updated successfully");
      }
      form.reset();
      onClose();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} Client</DialogTitle>
          <DialogDescription>
            {type === "Add" && "Add a new client here."} Click {type} when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter client's no. of projects"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client's country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referralSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral Source</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client's referral source" />
                      </SelectTrigger>
                      <SelectContent>
                        {referralSources.map((referralSource) => (
                          <SelectItem
                            key={referralSource}
                            value={referralSource}
                          >
                            {referralSource}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-full mt-4" type="submit">
              {type} Client
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
