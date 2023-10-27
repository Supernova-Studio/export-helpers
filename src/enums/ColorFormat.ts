export enum ColorFormat {
  /** RGB - rgb(r,g,b). Ignores alpha */
  rgb = 'rgb',
  /** RGBA - rgba(r,g,b,a). Always includes alpha */
  rgba = 'rgba',
  /** Selects between rgb and rgba modes based on non-opaque alpha */
  smartRgba = 'smartRgba',
  /** HEX - ffffff */
  hex6 = 'hex6',
  /** HEXA - ffffff00 */
  hex8 = 'hex8',
  /** #HEX - #ffffff */
  hashHex6 = 'hashHex6',
  /** #HEXA - #ffffff00 */
  hashHex8 = 'hashHex8',
  /** Selects between hex and hexa modes based on non-opaque alpha */
  smartHashHex = 'smartHashHex',
  /** Selects between hex and hexa modes based on non-opaque alpha */
  smartHex = 'smartHex',
  /** HSL - hsl(h,s,l). Ignores alpha */
  hsl = 'hsl',
  /** HSLA - hsla(h,s,l,a). Always includes alpha */
  hsla = 'hsla',
  /** Selects between hsl and hsla modes based on non-opaque alpha */
  smartHsla = 'smartHsla',
  /** iOS UIColor created as UIColor(rgb: 0x000000).withAlphaComponent(0.5). Alpha component will be ommited if fully opaque */
  smartUIColor = 'smartUIColor'
}
