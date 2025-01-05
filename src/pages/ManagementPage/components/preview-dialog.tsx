import {Button} from "../../../components/ui/button.tsx";
import {TextSearch} from "lucide-react";
import {TicketColumn} from "./columns.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../components/ui/dialog.tsx";

interface PreviewSheetProps {
  ticketData: TicketColumn
}

export default function PreviewDialog({ticketData}: PreviewSheetProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-1">
          <TextSearch />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Ticket Preview
            <div
              className={`inline-block px-2 py-1 rounded ${
                ticketData.ticket.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {ticketData.ticket.active ? "Active" : "Archived"}
            </div>
          </DialogTitle>
          <DialogDescription>
            {ticketData.ticket.description}
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col w-full h-40 rounded-lg justify-between">
          <div className="flex items-center">
            <img
              src={ticketData.ticket.stripe_image_url}
              alt="Ticket Image"
              className="w-36 h-36 rounded-lg m-2"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-medium leading-5 m-0">
                {ticketData.ticket.name}
              </h3>
              <h5 className="text-base font-medium leading-5 opacity-50 m-0">
                {`${ticketData.ticket.price} €`}
              </h5>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
