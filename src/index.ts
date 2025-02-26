import { Elysia } from "elysia";
import ThermalPrinter from "node-thermal-printer";
import { PrintTypes } from "./type";

const { PrinterTypes } = require("node-thermal-printer");

const printer = new ThermalPrinter.printer({
  type: PrinterTypes.EPSON,
  interface: "usb",
});

const app = new Elysia();

app.post("/print", async ({ body }: { body: PrintTypes }) => {
  try {
    const { storeName, items, total } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return { success: false, message: "Invalid or empty item list." };
    }

    printer.clear();
    printer.alignCenter();
    printer.bold(true);
    printer.println(storeName);
    printer.bold(false);
    printer.drawLine();

    printer.alignLeft();
    items.forEach((item) => {
      printer.println(`${item.name}  x${item.qty}  $${item.price}`);
    });

    printer.drawLine();
    printer.bold(true);
    printer.println(`Total: $${total}`);
    printer.bold(false);
    printer.newLine();
    printer.println("Thank you! Come again.");
    printer.cut();

    await printer.execute();
    return { success: true, message: "Receipt printed successfully!" };
  } catch (error) {
    return { success: false, message: "Print failed" };
  }
});

app.listen(3000, () => console.log("server running on port 3000"));
