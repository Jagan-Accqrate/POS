var printer = require("node-thermal-printer");

printer.init({
  type: "epson",
  interface: "ESDPRT001",
});

printer.isPrinterConnected(function (isConnected: boolean) {
  if (isConnected) {
    console.log("Printer is connected");
  } else {
    console.log("Printer is NOT connected");
  }
});

printer.alignCenter();

printer.println("Hello world");

printer.cut();

printer.execute(function (err: any) {
  if (err) {
    console.log("Print failed:", err);
  } else {
    console.log("Print done");
  }
