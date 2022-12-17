declare function showOpenFilePicker({
  multiple,
}: {
  multiple: boolean;
}): Promise<FileSystemFileHandle[]>;

interface FileSystemFileHandle {
  kind: string;
  name: string;
}

class FsModel {
  files: [] = [];

  async openFileOrFiles(multiple = false) {
    // Feature detection. The API needs to be supported
    // and the app not run in an iframe.
    const supportsFileSystemAccess =
      "showOpenFilePicker" in window &&
      (() => {
        try {
          return window.self === window.top;
        } catch {
          return false;
        }
      })();

    // If the File System Access API is supported…
    if (supportsFileSystemAccess) {
      let fileOrFiles = undefined;
      try {
        // Show the file picker, optionally allowing multiple files.
        fileOrFiles = await showOpenFilePicker({ multiple });
        console.log(fileOrFiles);

        if (!multiple) {
          // Only one file is requested.
          fileOrFiles = fileOrFiles[0];
        }
      } catch (err: any) {
        // Fail silently if the user has simply canceled the dialog.
        if (err.name !== "AbortError") {
          console.error(err.name, err.message);
        }
      }
      return fileOrFiles;
    }
    // Fallback if the File System Access API is not supported.
    return new Promise((resolve) => {
      // Append a new `<input type="file" multiple? />` and hide it.
      const input = document.createElement("input");
      input.style.display = "none";
      input.type = "file";
      document.body.append(input);
      if (multiple) {
        input.multiple = true;
      }
      // The `change` event fires when the user interacts with the dialog.
      input.addEventListener("change", () => {
        // Remove the `<input type="file" multiple? />` again from the DOM.
        input.remove();
        // If no files were selected, return.
        if (!input.files) {
          return;
        }
        // Return all files or just one file.
        resolve(multiple ? input.files : input.files[0]);
      });
      // Show the picker.
      if ("showPicker" in HTMLInputElement.prototype) {
        input.showPicker();
      } else {
        input.click();
      }
    });
  }
}

export default new FsModel();
