# File Helpers

This document outlines file helpers available.

## Usage

Import the helper from the library:

```typescript
import { CSSHelper } from "@supernovaio/export-helpers";
```

And use any static method available on the helper object `CSSHelper`.

## Available methods

### **`tokenToCSS`**

Converts a token to a CSS declaration with various options. This is the recommended way to convert tokens to CSS as there is a lot of logic as to which methods to use for which token type and how to combine all utilities together. This method also gracefully handles references to other tokens.

### **`colorTokenValueToCSS`**

Converts a color token value to a CSS declaration with various options

### **`borderTokenValueToCSS`**

Converts a border token value to a CSS declaration with various options

### **`gradientTokenValueToCSS`**

Converts a gradient token value to a CSS declaration with various options

### **`dimensionTokenValueToCSS`**

Converts a dimension token value to a CSS declaration with various options

### **`shadowTokenValueToCSS`**

Converts a shadow token value to a CSS declaration with various options

### **`stringTokenValueToCSS`**

Converts a string token value to a CSS declaration with various options

### **`optionTokenValueToCSS`**

Converts an option token value to a CSS declaration with various options

### **`blurTokenValueToCSS`**

Converts a blur token value to a CSS declaration with various options

### **`typographyTokenValueToCSS`**

Converts a typography token value to a CSS declaration with various options

### **`borderStyleToCSS`**

Converts a border style to a CSS declaration with various options

### **`borderPositionToCSS`**

Converts a border position to a CSS declaration with various options

### **`unitToCSS`**

Converts a dimension unit such as px, pt to a CSS declaration with various options

### **`textCaseToCSS`**

Converts a text case to a CSS declaration with various options

### **`textDecorationToCSS`**

Converts a text decoration to a CSS declaration with various options