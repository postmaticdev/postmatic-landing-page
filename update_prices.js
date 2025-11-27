const fs = require("fs");
const path = require("path");

const messagesDir =
  "/Users/lanstheprodigy/Data/project/postmatic/postmatic-landing-page/messages";

fs.readdir(messagesDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === ".json") {
      const filePath = path.join(messagesDir, file);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        try {
          const json = JSON.parse(data);
          if (json.pricing && json.pricing.plans) {
            json.pricing.plans.forEach((plan) => {
              if (plan.items) {
                plan.items.forEach((item) => {
                  if (typeof item.price === "number") {
                    item.price = item.price / 2;
                  }
                  if (typeof item.originalPrice === "number") {
                    item.originalPrice = item.originalPrice / 2;
                  }
                });
              }
            });

            // Write back to file
            fs.writeFile(
              filePath,
              JSON.stringify(json, null, 2),
              "utf8",
              (err) => {
                if (err) {
                  console.error(`Error writing file ${file}:`, err);
                } else {
                  console.log(`Updated ${file}`);
                }
              }
            );
          } else {
            console.log(`Skipping ${file}: No pricing.plans found`);
          }
        } catch (parseErr) {
          console.error(`Error parsing JSON in ${file}:`, parseErr);
        }
      });
    }
  });
});
