import { existsSync } from "fs";
import { unlink } from "fs/promises";

export function isFileExist(filePath) {
  if (!filePath) {
    return {
      error: true,
      message: "File path is not given to unlink file",
      status: 403,
    };
  }
  if (existsSync(filePath)) {
    unlink(filePath, (err) => {
      if (err) {
        return {
          error: true,
          message: "Error occured while unlinking file",
          status: 403,
        };
      }
    });
  }
}
