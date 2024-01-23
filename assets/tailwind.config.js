// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography")

const fs = require("fs");
const path = require("path");


module.exports = {
  content: [
    "./js/**/*.js",
    "../lib/nheindev_web.ex",
    "../lib/nheindev_web/**/*.*ex",
    "../lib/nheindev_web/**/*.html.heex",
    "../deps/petal_components/**/*.*ex",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
        typography: {
          DEFAULT: {
            css: {
              pre: false,
              code: false,
              'pre code': false,
              'code::before': false,
              'code::after': false
            }
          }
        },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: "hsl(var(--primary-foreground))",
          '50': 'hsl(240, 5.9%, 60%)',
          '100': 'hsl(240, 5.9%, 50%)',
          '200': 'hsl(240, 5.9%, 40%)',
          '300': 'hsl(240, 5.9%, 30%)',
          '400': 'hsl(240, 5.9%, 20%)',
          '500': 'hsl(240, 5.9%, 15%)',
          '600': 'hsl(240, 5.9%, 10%)',
          '700': 'hsl(240, 5.9%, 8%)',
          '800': 'hsl(240, 5.9%, 6%)',
          '900': 'hsl(240, 5.9%, 4%)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: "hsl(var(--secondary-foreground))",
          '50': 'hsl(240, 4.8%, 99%)',
          '100': 'hsl(240, 4.8%, 98%)',
          '200': 'hsl(240, 4.8%, 90%)',
          '300': 'hsl(240, 4.8%, 85%)',
          '400': 'hsl(240, 4.8%, 80%)',
          '500': 'hsl(240, 4.8%, 75%)',
          '600': 'hsl(240, 4.8%, 70%)',
          '700': 'hsl(240, 4.8%, 65%)',
          '800': 'hsl(240, 4.8%, 60%)',
          '900': 'hsl(240, 4.8%, 55%)',
        },
        success: colors.green,
        warning: colors.yellow,
        info: colors.sky,
        danger: colors.red,
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    plugins: [
      require("@tailwindcss/forms"),
      // Allows prefixing tailwind classes with LiveView classes to add rules
      // only when LiveView classes are applied, for example:
      //
      //     <div class="phx-click-loading:animate-ping">
      //
      plugin(({ addVariant }) =>
        addVariant("phx-no-feedback", [
          ".phx-no-feedback&",
          ".phx-no-feedback &",
        ])
      ),
      plugin(({ addVariant }) =>
        addVariant("phx-click-loading", [
          ".phx-click-loading&",
          ".phx-click-loading &",
        ])
      ),
      plugin(({ addVariant }) =>
        addVariant("phx-submit-loading", [
          ".phx-submit-loading&",
          ".phx-submit-loading &",
        ])
      ),
      plugin(({ addVariant }) =>
        addVariant("phx-change-loading", [
          ".phx-change-loading&",
          ".phx-change-loading &",
        ])
      ),
      // Embeds Heroicons (https://heroicons.com) into your app.css bundle
      // See your `CoreComponents.icon/1` for more information.
      //
      plugin(function ({ matchComponents, theme }) {
        let iconsDir = path.join(__dirname, "./vendor/heroicons/optimized");
        let values = {};
        let icons = [
          ["", "/24/outline"],
          ["-solid", "/24/solid"],
          ["-mini", "/20/solid"],
        ];
        icons.forEach(([suffix, dir]) => {
          fs.readdirSync(path.join(iconsDir, dir)).forEach((file) => {
            let name = path.basename(file, ".svg") + suffix;
            values[name] = { name, fullPath: path.join(iconsDir, dir, file) };
          });
        });
        matchComponents(
          {
            hero: ({ name, fullPath }) => {
              let content = fs
                .readFileSync(fullPath)
                .toString()
                .replace(/\r?\n|\r/g, "");
              return {
                [`--hero-${name}`]: `url('data:image/svg+xml;utf8,${content}')`,
                "-webkit-mask": `var(--hero-${name})`,
                mask: `var(--hero-${name})`,
                "mask-repeat": "no-repeat",
                "background-color": "currentColor",
                "vertical-align": "middle",
                display: "inline-block",
                width: theme("spacing.5"),
                height: theme("spacing.5"),
              };
            },
          },
          { values }
        );
      }),
    ],
  },
};
