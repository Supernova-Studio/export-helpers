# File Helpers

This document outlines file helpers available.

## Usage

Import the helper from the library:

```typescript
import { FileHelper } from "@supernovaio/export-helpers";
```

And use any static method available on the helper object `FileHelper`.

## Available methods

### **`createCopyRemoteFile`**

Creates a file definition that tells exporter to take content of the provided URL and copy it to the resulting file

### **`createTextFile`**

Creates a file definition that tells exporter to take provided text and create file with the text as a content

### **`createBinaryFile`**

Creates a file definition that tells exporter to take provided binary data and create file with the data as a content