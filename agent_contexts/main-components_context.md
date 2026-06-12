This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: layers/main/app/components/**/*
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
layers/
  main/
    app/
      components/
        ha/
          buildings/
            HaAstyError.vue
            HaAstyLevel1.vue
            HaAstyLevel2.vue
            HaAstyLevel3.vue
            HaAstyLoading.vue
            HaAstyUnable.vue
            HaDTCError.vue
            HaDTCLevel1.vue
            HaDTCLevel2.vue
            HaDTCLevel3.vue
            HaDTCLoading.vue
            HaDTCUnable.vue
          icons/
            HaArrowRightIcon.vue
            HaBalanceIcon.vue
            HaBroadcastIcon.vue
            HaCalendarIcon.vue
            HaCameraIcon.vue
            HaChevronDownIcon.vue
            HaChevronLeftIcon.vue
            HaChevronRightIcon.vue
            HaCircledQuestionIcon.vue
            HaCloseIcon.vue
            HaCommunityIcon.vue
            HaCompanyIcon.vue
            HaDangerIcon.vue
            HaEmailIcon.vue
            HaHamburgerIcon.vue
            HaHeartIcon.vue
            HaInfoIcon.vue
            HaJumpToPageIcon.vue
            HaMapPinIcon.vue
            HaOpenBookIcon.vue
            HaPeopleFillIcon.vue
            HaPeopleIcon.vue
            HaPeopleUnableIcon.vue
            HaQuestionIcon.vue
            HaShieldIcon.vue
            HaStarShineIcon.vue
            HaSunIcon.vue
            HaSunsetIcon.vue
            HaTicketIcon.vue
            HaTimerIcon.vue
            HaWorldIcon.vue
            HaXIcon.vue
          HaAboutCard.vue
          HaAccordionItem.vue
          HaAnchorLink.vue
          HaCommingSoon.vue
          HaCommingSoonCard.vue
          HaConductCard.vue
          HaConfetti.vue
          HaContactCard.vue
          HaContentCard.vue
          HaCountUpNumber.vue
          HaDocumentLink.vue
          HaFireworks.vue
          HaFirstView.vue
          HaInfoCard.vue
          HaPageTitle.vue
          HaQuickAccessCard.vue
          HaSectionTitle.vue
          HaShimmer.vue
          HaSponsorCard.vue
          HaSwiperCard.vue
          HaTicketCard.vue
          HaTypewriterText.vue
        hm/
          HmContentsSwiper.vue
          HmCrowdLevelCard.vue
          HmNewsSwiper.vue
        ho/
          HoTheFooter.vue
          HoTheHeader.vue
        ht/
          HtAboutSection.vue
          HtAccessSection.vue
          HtCodeOfConductSection.vue
          HtContactSection.vue
          HtContentsSection.vue
          HtCrowdLevelsSection.vue
          HtExhibitionSection.vue
          HtExhibitorInfoSection.vue
          HtHeroSection.vue
          HtNewsSection.vue
          HtParticipationGuide.vue
          HtQandASection.vue
          HtQuickAccessSection.vue
          HtRelatedEventsSection.vue
          HtScheduleSection.vue
          HtSponsorsAndPartnersSection.vue
          HtTicketSection.vue
          HtTop.vue
```

# Files

## File: layers/main/app/components/ha/buildings/HaAstyError.vue
```vue
<template>
  <svg
    viewBox="0 0 269 173"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="159.096"
      height="85.5081"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8297 110.497)"
      fill="url(#paint0_linear_645_898)"
    />
    <path
      d="M24.0251 125.026V110.491L97.8948 153.093V167.626L24.0251 125.026Z"
      fill="url(#paint1_linear_645_898)"
    />
    <path
      d="M97.8948 153.289V167.626L235.472 88.2839V73.9473L97.8948 153.289Z"
      fill="url(#paint2_linear_645_898)"
    />
    <g filter="url(#filter0_f_645_898)">
      <rect
        width="167.407"
        height="93.9689"
        transform="matrix(0.866044 -0.499967 0.866044 0.499967 21.0938 104.792)"
        fill="#ACBABF"
        fill-opacity="0.25"
      />
    </g>
    <rect
      width="158.315"
      height="85.0886"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8163 99.8572)"
      fill="#D9D9D9"
    />
    <path
      d="M234.615 56.2449L170.871 93.0447H24.1425L23.8163 92.8562L160.925 13.7039L234.615 56.2449Z"
      fill="#D8E8EE"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M97.3235 142.321C97.314 142.297 97.307 142.272 97.3069 142.245V135.438C97.3069 135.411 97.3138 135.386 97.3235 135.361V142.321ZM234.315 56.3036C234.38 56.266 234.46 56.266 234.526 56.3036C234.591 56.3413 234.631 56.4109 234.631 56.4862V63.2929C234.631 63.368 234.591 63.438 234.526 63.4755L183.252 93.0448H170.606L234.315 56.3036Z"
      fill="#C2D0D3"
    />
    <path
      d="M170.883 100.045H23.8163V93.0449H183.163L170.883 100.045Z"
      fill="#C2D0D3"
    />
    <defs>
      <filter
        id="filter0_f_645_898"
        x="0"
        y="0"
        width="268.551"
        height="172.867"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10.5469"
          result="effect1_foregroundBlur_645_898"
        />
      </filter>
      <linearGradient
        id="paint0_linear_645_898"
        x1="79.5479"
        y1="85.5081"
        x2="79.5479"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_645_898"
        x1="60.96"
        y1="167.626"
        x2="60.96"
        y2="110.491"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_645_898"
        x1="166.684"
        y1="167.626"
        x2="166.684"
        y2="73.9473"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaAstyLevel1.vue
```vue
<template>
  <svg
    viewBox="0 0 269 173"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="159.096"
      height="85.5081"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8297 110.497)"
      fill="url(#paint0_linear_645_816)"
    />
    <path
      d="M24.0251 125.026V110.491L97.8948 153.093V167.626L24.0251 125.026Z"
      fill="url(#paint1_linear_645_816)"
    />
    <path
      d="M97.8948 153.289V167.626L235.472 88.2839V73.9473L97.8948 153.289Z"
      fill="url(#paint2_linear_645_816)"
    />
    <g filter="url(#filter0_f_645_816)">
      <rect
        width="167.407"
        height="93.9689"
        transform="matrix(0.866044 -0.499967 0.866044 0.499967 21.0938 104.792)"
        fill="#71FFCD"
        fill-opacity="0.25"
      />
    </g>
    <rect
      width="158.315"
      height="85.0886"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8163 99.8572)"
      fill="#D9D9D9"
    />
    <path
      d="M234.615 56.2449L170.871 93.0447H24.1425L23.8163 92.8562L160.925 13.7039L234.615 56.2449Z"
      fill="#D2FFEF"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M97.3235 142.321C97.314 142.297 97.3069 142.271 97.3069 142.244V135.438C97.3069 135.411 97.3138 135.385 97.3235 135.361V142.321ZM234.315 56.3031C234.38 56.2655 234.46 56.2655 234.526 56.3031C234.591 56.3408 234.631 56.4104 234.631 56.4857V63.2924C234.631 63.3676 234.591 63.4374 234.526 63.475L183.251 93.0453H170.604L234.315 56.3031Z"
      fill="#C2D3CD"
    />
    <path
      d="M170.883 100.045H23.8163V93.0449H183.163L170.883 100.045Z"
      fill="#C2D3CD"
    />
    <defs>
      <filter
        id="filter0_f_645_816"
        x="0"
        y="0"
        width="268.551"
        height="172.867"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10.5469"
          result="effect1_foregroundBlur_645_816"
        />
      </filter>
      <linearGradient
        id="paint0_linear_645_816"
        x1="79.5479"
        y1="85.5081"
        x2="79.5479"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_645_816"
        x1="60.96"
        y1="167.626"
        x2="60.96"
        y2="110.491"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_645_816"
        x1="166.683"
        y1="167.626"
        x2="166.683"
        y2="73.9473"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaAstyLevel2.vue
```vue
<template>
  <svg
    viewBox="0 0 269 175"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="159.096"
      height="85.5081"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.4806 111.793)"
      fill="url(#paint0_linear_645_831)"
    />
    <path
      d="M23.676 126.323V111.787L97.5457 154.389V168.923L23.676 126.323Z"
      fill="url(#paint1_linear_645_831)"
    />
    <path
      d="M97.5458 154.585V168.923L235.123 89.5801V75.2434L97.5458 154.585Z"
      fill="url(#paint2_linear_645_831)"
    />
    <g filter="url(#filter0_f_645_831)">
      <path
        d="M21.0938 106.088L166.076 22.3898L247.457 69.3712L102.475 153.069L21.0938 106.088Z"
        fill="#FFA500"
        fill-opacity="0.25"
      />
    </g>
    <rect
      width="158.315"
      height="85.0886"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8163 101.153)"
      fill="#D9D9D9"
    />
    <path
      d="M234.615 42.542L144.889 94.3408H50.1259L23.8163 79.1523L160.925 0L234.615 42.542Z"
      fill="#F5EFDC"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M97.3235 143.617C97.314 143.593 97.3069 143.567 97.3069 143.541V121.733C97.3069 121.706 97.3136 121.68 97.3235 121.655V143.617ZM234.315 42.5973C234.38 42.5597 234.46 42.5597 234.526 42.5973C234.591 42.635 234.631 42.7046 234.631 42.7799V64.5885C234.631 64.6638 234.591 64.7335 234.526 64.7711L183.252 94.3405H144.592L234.315 42.5973Z"
      fill="#D3CFC2"
    />
    <path
      d="M183.276 94.2761L170.883 101.342H23.8163V79.3425H183.276V94.2761Z"
      fill="#D3CFC2"
    />
    <defs>
      <filter
        id="filter0_f_645_831"
        x="0"
        y="1.29614"
        width="268.551"
        height="172.867"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10.5469"
          result="effect1_foregroundBlur_645_831"
        />
      </filter>
      <linearGradient
        id="paint0_linear_645_831"
        x1="79.5479"
        y1="85.5081"
        x2="79.5479"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_645_831"
        x1="60.6109"
        y1="168.923"
        x2="60.6109"
        y2="111.787"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_645_831"
        x1="166.334"
        y1="168.923"
        x2="166.334"
        y2="75.2434"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaAstyLevel3.vue
```vue
<template>
  <svg
    viewBox="0 0 269 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="159.096"
      height="85.5081"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.6173 126.793)"
      fill="url(#paint0_linear_645_845)"
    />
    <path
      d="M23.8129 141.323V126.787L97.6825 169.389V183.923L23.8129 141.323Z"
      fill="url(#paint1_linear_645_845)"
    />
    <path
      d="M97.6825 169.585V183.923L235.26 104.58V90.2434L97.6825 169.585Z"
      fill="url(#paint2_linear_645_845)"
    />
    <g filter="url(#filter0_f_645_845)">
      <path
        d="M21.0938 121.088L166.076 37.3898L247.457 84.3712L102.475 168.069L21.0938 121.088Z"
        fill="#FF4500"
        fill-opacity="0.24"
      />
    </g>
    <rect
      width="158.315"
      height="85.0886"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8163 116.153)"
      fill="#D9D9D9"
    />
    <path
      d="M234.615 42.542L144.889 94.3408H50.1259L23.8163 79.1523L160.925 0L234.615 42.542Z"
      fill="#FFD2C2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M97.3235 158.617C97.314 158.592 97.3069 158.567 97.3069 158.54V121.733C97.3069 121.706 97.3139 121.68 97.3235 121.656V158.617ZM234.315 42.597C234.38 42.5594 234.46 42.5595 234.526 42.597C234.591 42.6347 234.631 42.7044 234.631 42.7797V79.5883C234.631 79.6635 234.591 79.7333 234.526 79.7709L183.251 109.341H118.581L234.315 42.597Z"
      fill="#D3CAC2"
    />
    <path
      d="M183.276 109.276L170.883 116.342H23.8163V79.3425H183.276V109.276Z"
      fill="#D3CAC2"
    />
    <defs>
      <filter
        id="filter0_f_645_845"
        x="0"
        y="16.2961"
        width="268.551"
        height="172.867"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10.5469"
          result="effect1_foregroundBlur_645_845"
        />
      </filter>
      <linearGradient
        id="paint0_linear_645_845"
        x1="79.5479"
        y1="85.5081"
        x2="79.5479"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_645_845"
        x1="60.7477"
        y1="183.923"
        x2="60.7477"
        y2="126.787"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_645_845"
        x1="166.471"
        y1="183.923"
        x2="166.471"
        y2="90.2434"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaAstyUnable.vue
```vue
<template>
  <svg
    viewBox="0 0 269 173"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="159.096"
      height="85.5081"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8297 110.497)"
      fill="url(#paint0_linear_645_898)"
    />
    <path
      d="M24.0251 125.026V110.491L97.8948 153.093V167.626L24.0251 125.026Z"
      fill="url(#paint1_linear_645_898)"
    />
    <path
      d="M97.8948 153.289V167.626L235.472 88.2839V73.9473L97.8948 153.289Z"
      fill="url(#paint2_linear_645_898)"
    />
    <g filter="url(#filter0_f_645_898)">
      <rect
        width="167.407"
        height="93.9689"
        transform="matrix(0.866044 -0.499967 0.866044 0.499967 21.0938 104.792)"
        fill="#ACBABF"
        fill-opacity="0.25"
      />
    </g>
    <rect
      width="158.315"
      height="85.0886"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8163 99.8572)"
      fill="#D9D9D9"
    />
    <path
      d="M234.615 56.2449L170.871 93.0447H24.1425L23.8163 92.8562L160.925 13.7039L234.615 56.2449Z"
      fill="#D8E8EE"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M97.3235 142.321C97.314 142.297 97.307 142.272 97.3069 142.245V135.438C97.3069 135.411 97.3138 135.386 97.3235 135.361V142.321ZM234.315 56.3036C234.38 56.266 234.46 56.266 234.526 56.3036C234.591 56.3413 234.631 56.4109 234.631 56.4862V63.2929C234.631 63.368 234.591 63.438 234.526 63.4755L183.252 93.0448H170.606L234.315 56.3036Z"
      fill="#C2D0D3"
    />
    <path
      d="M170.883 100.045H23.8163V93.0449H183.163L170.883 100.045Z"
      fill="#C2D0D3"
    />
    <defs>
      <filter
        id="filter0_f_645_898"
        x="0"
        y="0"
        width="268.551"
        height="172.867"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10.5469"
          result="effect1_foregroundBlur_645_898"
        />
      </filter>
      <linearGradient
        id="paint0_linear_645_898"
        x1="79.5479"
        y1="85.5081"
        x2="79.5479"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_645_898"
        x1="60.96"
        y1="167.626"
        x2="60.96"
        y2="110.491"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_645_898"
        x1="166.684"
        y1="167.626"
        x2="166.684"
        y2="73.9473"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaDTCError.vue
```vue
<template>
  <svg
    viewBox="0 0 288 187"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5447 93.7966C44.4581 93.7479 44.3515 93.7488 44.2654 93.7986C44.1786 93.8489 44.1248 93.9414 44.1248 94.0417V114.476C44.1248 114.577 44.1793 114.67 44.2664 114.72L143.281 171.75L144.613 172.522C144.63 172.598 144.677 172.665 144.746 172.705C144.833 172.755 144.94 172.755 145.027 172.705L226.264 125.479L243.539 115.526L243.457 115.477C243.52 115.424 243.558 115.347 243.558 115.263V94.7078L243.802 94.5681L243.487 94.3845C243.467 94.3622 243.444 94.3423 243.418 94.3269C243.392 94.3118 243.363 94.3017 243.335 94.2957L143.837 36.4753L44.5447 93.7966Z"
      fill="url(#paint0_linear_640_747)"
    />
    <g filter="url(#filter0_f_640_747)">
      <path
        d="M259.803 91.5139L137.927 28.1251L28.125 91.5139L146.982 158.001L259.803 91.5139Z"
        fill="#ACBABF"
        fill-opacity="0.25"
      />
    </g>
    <path
      d="M244.848 86.1103L144.605 27.9248L45.7041 85.0608L145.922 143.108L244.848 86.1103Z"
      fill="#D9D9D9"
    />
    <path
      d="M46.2063 74.4588L145.938 132.224L244.624 75.1526L145.145 17.3414L46.2063 74.4588Z"
      fill="#D8E8EE"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M244.586 85.8477V75.1499L146.194 132.09V143.046L244.586 85.8477Z"
      fill="#C2D0D3"
      stroke="#ACBABF"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M145.932 132.09V142.784L45.7146 85.061V74.6301L145.932 132.09Z"
      fill="#C2D0D3"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_f_640_747"
        x="0"
        y="0"
        width="287.928"
        height="186.126"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.0625"
          result="effect1_foregroundBlur_640_747"
        />
      </filter>
      <linearGradient
        id="paint0_linear_640_747"
        x1="143.963"
        y1="172.742"
        x2="143.963"
        y2="36.4753"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaDTCLevel1.vue
```vue
<template>
  <svg
    viewBox="0 0 280 187"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36.4197 93.7966C36.3331 93.7479 36.2265 93.7488 36.1404 93.7986C36.0536 93.8489 35.9998 93.9414 35.9998 94.0417V114.476C35.9998 114.577 36.0543 114.67 36.1414 114.72L135.156 171.75L136.488 172.522C136.505 172.598 136.552 172.665 136.621 172.705C136.708 172.755 136.815 172.755 136.902 172.705L218.139 125.479L235.414 115.526L235.332 115.477C235.395 115.424 235.433 115.347 235.433 115.263V94.7078L235.677 94.5681L235.362 94.3845C235.342 94.3622 235.319 94.3423 235.293 94.3269C235.267 94.3118 235.238 94.3017 235.21 94.2957L135.712 36.4753L36.4197 93.7966Z"
      fill="url(#paint0_linear_637_546)"
    />
    <g filter="url(#filter0_f_637_546)">
      <path
        d="M251.678 91.5139L129.802 28.1251L20 91.5139L138.857 158.001L251.678 91.5139Z"
        fill="#71FFCD"
        fill-opacity="0.25"
      />
    </g>
    <path
      d="M236.723 86.1103L136.48 27.9248L37.5791 85.0608L137.797 143.108L236.723 86.1103Z"
      fill="#D9D9D9"
    />
    <path
      d="M38.0813 74.4588L137.813 132.224L236.499 75.1526L137.02 17.3414L38.0813 74.4588Z"
      fill="#D2FFEF"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M236.461 85.8477V75.1499L138.069 132.09V143.046L236.461 85.8477Z"
      fill="#C2D3CD"
      stroke="#ACBABF"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M137.807 132.09V142.784L37.5896 85.061V74.6301L137.807 132.09Z"
      fill="#C2D3CD"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_f_637_546"
        x="-8.125"
        y="0"
        width="287.928"
        height="186.126"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.0625"
          result="effect1_foregroundBlur_637_546"
        />
      </filter>
      <linearGradient
        id="paint0_linear_637_546"
        x1="135.838"
        y1="172.742"
        x2="135.838"
        y2="36.4753"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaDTCLevel2.vue
```vue
<template>
  <svg
    viewBox="0 0 288 190"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5447 96.7366C44.4581 96.6878 44.3515 96.6887 44.2654 96.7385C44.1786 96.7888 44.1248 96.8814 44.1248 96.9817V117.416C44.1248 117.517 44.1793 117.61 44.2664 117.66L143.281 174.69L144.613 175.462C144.63 175.538 144.677 175.605 144.746 175.645C144.833 175.695 144.94 175.695 145.027 175.645L226.264 128.419L243.539 118.466L243.457 118.417C243.52 118.364 243.558 118.287 243.558 118.203V97.6477L243.802 97.5081L243.487 97.3245C243.467 97.3021 243.444 97.2822 243.418 97.2668C243.392 97.2518 243.363 97.2416 243.335 97.2356L143.837 39.4153L44.5447 96.7366Z"
      fill="url(#paint0_linear_637_561)"
    />
    <g filter="url(#filter0_f_637_561)">
      <path
        d="M259.803 94.4539L137.927 31.0651L28.125 94.4538L146.982 160.941L259.803 94.4539Z"
        fill="#FFA500"
        fill-opacity="0.25"
      />
    </g>
    <path
      d="M244.848 89.0502L144.605 30.8647L45.7041 88.0007L145.922 146.048L244.848 89.0502Z"
      fill="#D9D9D9"
    />
    <path
      d="M46.2063 57.3987L145.938 115.164L244.624 58.0925L145.145 0.281352L46.2063 57.3987Z"
      fill="#F5EFDC"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M244.586 88.7877V58.0898L146.194 115.03V145.986L244.586 88.7877Z"
      fill="#D3CFC2"
      stroke="#ACBABF"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M145.932 115.03V145.723L45.7146 88.0007V57.5698L145.932 115.03Z"
      fill="#D3CFC2"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_f_637_561"
        x="0"
        y="2.93994"
        width="287.928"
        height="186.126"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.0625"
          result="effect1_foregroundBlur_637_561"
        />
      </filter>
      <linearGradient
        id="paint0_linear_637_561"
        x1="143.963"
        y1="175.682"
        x2="143.963"
        y2="39.4153"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaDTCLevel3.vue
```vue
<template>
  <svg
    viewBox="0 0 288 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5447 116.737C44.4581 116.688 44.3515 116.689 44.2654 116.739C44.1786 116.789 44.1248 116.881 44.1248 116.982V137.416C44.1248 137.517 44.1793 137.61 44.2664 137.66L143.281 194.69L144.613 195.462C144.63 195.538 144.677 195.605 144.746 195.645C144.833 195.695 144.94 195.695 145.027 195.645L226.264 148.419L243.539 138.466L243.457 138.417C243.52 138.364 243.558 138.287 243.558 138.203V117.648L243.802 117.508L243.487 117.324C243.467 117.302 243.444 117.282 243.418 117.267C243.392 117.252 243.363 117.242 243.335 117.236L143.837 59.4153L44.5447 116.737Z"
      fill="url(#paint0_linear_638_576)"
    />
    <g filter="url(#filter0_f_638_576)">
      <path
        d="M259.803 114.454L137.927 51.0651L28.125 114.454L146.982 180.941L259.803 114.454Z"
        fill="#FF4500"
        fill-opacity="0.25"
      />
    </g>
    <path
      d="M244.848 109.05L144.605 50.8647L45.7041 108.001L145.922 166.048L244.848 109.05Z"
      fill="#D9D9D9"
    />
    <path
      d="M46.2063 57.3987L145.938 115.164L244.624 58.0925L145.145 0.281352L46.2063 57.3987Z"
      fill="#FFD2C2"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M244.586 108.788V58.0901L146.194 115.03V165.986L244.586 108.788Z"
      fill="#D3CAC2"
      stroke="#ACBABF"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M145.932 115.03V165.724L45.7146 108.001V57.5701L145.932 115.03Z"
      fill="#D3CAC2"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_f_638_576"
        x="0"
        y="22.9399"
        width="287.928"
        height="186.126"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.0625"
          result="effect1_foregroundBlur_638_576"
        />
      </filter>
      <linearGradient
        id="paint0_linear_638_576"
        x1="143.963"
        y1="195.682"
        x2="143.963"
        y2="59.4153"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaDTCUnable.vue
```vue
<template>
  <svg
    viewBox="0 0 288 187"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5447 93.7966C44.4581 93.7479 44.3515 93.7488 44.2654 93.7986C44.1786 93.8489 44.1248 93.9414 44.1248 94.0417V114.476C44.1248 114.577 44.1793 114.67 44.2664 114.72L143.281 171.75L144.613 172.522C144.63 172.598 144.677 172.665 144.746 172.705C144.833 172.755 144.94 172.755 145.027 172.705L226.264 125.479L243.539 115.526L243.457 115.477C243.52 115.424 243.558 115.347 243.558 115.263V94.7078L243.802 94.5681L243.487 94.3845C243.467 94.3622 243.444 94.3423 243.418 94.3269C243.392 94.3118 243.363 94.3017 243.335 94.2957L143.837 36.4753L44.5447 93.7966Z"
      fill="url(#paint0_linear_640_747)"
    />
    <g filter="url(#filter0_f_640_747)">
      <path
        d="M259.803 91.5139L137.927 28.1251L28.125 91.5139L146.982 158.001L259.803 91.5139Z"
        fill="#ACBABF"
        fill-opacity="0.25"
      />
    </g>
    <path
      d="M244.848 86.1103L144.605 27.9248L45.7041 85.0608L145.922 143.108L244.848 86.1103Z"
      fill="#D9D9D9"
    />
    <path
      d="M46.2063 74.4588L145.938 132.224L244.624 75.1526L145.145 17.3414L46.2063 74.4588Z"
      fill="#D8E8EE"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M244.586 85.8477V75.1499L146.194 132.09V143.046L244.586 85.8477Z"
      fill="#C2D0D3"
      stroke="#ACBABF"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M145.932 132.09V142.784L45.7146 85.061V74.6301L145.932 132.09Z"
      fill="#C2D0D3"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_f_640_747"
        x="0"
        y="0"
        width="287.928"
        height="186.126"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.0625"
          result="effect1_foregroundBlur_640_747"
        />
      </filter>
      <linearGradient
        id="paint0_linear_640_747"
        x1="143.963"
        y1="172.742"
        x2="143.963"
        y2="36.4753"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaArrowRightIcon.vue
```vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.2344 12.8676H4.28924C4.06173 12.8676 3.84353 12.958 3.68265 13.1189C3.52178 13.2798 3.4314 13.498 3.4314 13.7255C3.4314 13.953 3.52178 14.1712 3.68265 14.3321C3.84353 14.4929 4.06173 14.5833 4.28924 14.5833H20.2344L13.9748 20.8375C13.8134 20.9989 13.7228 21.2178 13.7228 21.4461C13.7228 21.6743 13.8134 21.8932 13.9748 22.0546C14.1362 22.216 14.3551 22.3067 14.5834 22.3067C14.8116 22.3067 15.0305 22.216 15.1919 22.0546L22.9125 14.334C22.9927 14.2543 23.0564 14.1595 23.0999 14.055C23.1433 13.9506 23.1657 13.8386 23.1657 13.7255C23.1657 13.6124 23.1433 13.5004 23.0999 13.3959C23.0564 13.2915 22.9927 13.1967 22.9125 13.1169L15.1919 5.39635C15.112 5.31644 15.0171 5.25304 14.9127 5.2098C14.8083 5.16655 14.6964 5.14429 14.5834 5.14429C14.4703 5.14429 14.3584 5.16655 14.254 5.2098C14.1496 5.25304 14.0547 5.31644 13.9748 5.39635C13.8949 5.47626 13.8315 5.57113 13.7883 5.67555C13.745 5.77996 13.7228 5.89187 13.7228 6.00488C13.7228 6.1179 13.745 6.22981 13.7883 6.33422C13.8315 6.43863 13.8949 6.5335 13.9748 6.61341L20.2344 12.8676Z"
      fill="#43FFBD"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaBroadcastIcon.vue
```vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.863 13.644L5 13.25H4.5C4.36739 13.25 4.24021 13.1973 4.14645 13.1036C4.05268 13.0098 4 12.8826 4 12.75V9.75C4 9.61739 4.05268 9.49021 4.14645 9.39645C4.24021 9.30268 4.36739 9.25 4.5 9.25H5L18 6.5H20V16H18L14.146 15.185L14.172 15.193C13.8993 16.0913 13.2995 16.8547 12.4912 17.3322C11.6828 17.8098 10.7248 17.9667 9.80636 17.7721C8.88792 17.5775 8.07589 17.0455 7.53073 16.2811C6.98557 15.5168 6.74794 14.5758 6.863 13.644ZM8.34 13.957C8.30786 14.4952 8.47 15.0271 8.79692 15.4559C9.12384 15.8847 9.59382 16.1819 10.1214 16.2935C10.6489 16.405 11.199 16.3235 11.6715 16.0637C12.144 15.8039 12.5075 15.3832 12.696 14.878L8.34 13.957ZM5.5 10.677L18.157 8H18.5V14.5H18.157L5.5 11.823V10.677Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaCalendarIcon.vue
```vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.7255 4.5752H21.7321C22.3611 4.5752 22.8758 5.0899 22.8758 5.71899V21.7321C22.8758 22.3611 22.3611 22.8758 21.7321 22.8758H5.71899C5.0899 22.8758 4.5752 22.3611 4.5752 21.7321V5.71899C4.5752 5.0899 5.0899 4.5752 5.71899 4.5752H13.7255Z"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.74866 5.18958H23.1428V9.27717H4.74866V5.18958Z"
      fill="white"
    />
    <path
      d="M8.00659 4.57518V2.2876M19.4445 4.57518V2.2876"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.00659 12.5817H19.4445"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.00659 17.1569H16.0131"
      stroke="white"
      stroke-width="1.61546"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaChevronLeftIcon.vue
```vue
<template>
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_360_1868)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.0515 18.1781C10.6605 17.7866 10.4409 17.2559 10.4409 16.7027C10.4409 16.1494 10.6605 15.6187 11.0515 15.2273L18.9241 7.35194C19.3157 6.96045 19.8469 6.74059 20.4006 6.74072C20.6748 6.74079 20.9464 6.79486 21.1997 6.89985C21.453 7.00484 21.6831 7.1587 21.877 7.35264C22.0708 7.54657 22.2245 7.77679 22.3294 8.03014C22.4343 8.2835 22.4882 8.55503 22.4882 8.82923C22.4881 9.10343 22.434 9.37494 22.329 9.62824C22.224 9.88155 22.0702 10.1117 21.8763 10.3055L15.4805 16.7027L21.8776 23.0998C22.0771 23.2923 22.2363 23.5226 22.3459 23.7773C22.4554 24.032 22.5131 24.3059 22.5157 24.5831C22.5182 24.8603 22.4655 25.1353 22.3606 25.3919C22.2558 25.6486 22.1009 25.8817 21.9049 26.0779C21.709 26.274 21.4759 26.4291 21.2194 26.5342C20.9629 26.6393 20.688 26.6923 20.4108 26.69C20.1335 26.6877 19.8595 26.6303 19.6048 26.521C19.35 26.4117 19.1195 26.2527 18.9268 26.0534L11.0487 18.1781H11.0515Z"
        fill="#FFFFFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_360_1868">
        <rect
          width="33.4054"
          height="33.4054"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaChevronRightIcon.vue
```vue
<template>
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_360_1864)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.3539 15.2273C22.7449 15.6188 22.9645 16.1495 22.9645 16.7027C22.9645 17.256 22.7449 17.7867 22.3539 18.1781L14.4814 26.0535C14.0897 26.445 13.5585 26.6648 13.0048 26.6647C12.451 26.6646 11.9199 26.4444 11.5285 26.0528C11.137 25.6611 10.9171 25.13 10.9172 24.5762C10.9174 24.0224 11.1375 23.4914 11.5291 23.0999L17.9263 16.7027L11.5291 10.3056C11.1486 9.91201 10.9379 9.38472 10.9424 8.83729C10.9469 8.28986 11.1663 7.7661 11.5532 7.37881C11.9401 6.99152 12.4637 6.7717 13.0111 6.76669C13.5585 6.76168 14.086 6.97187 14.48 7.35201L22.3553 15.2259L22.3539 15.2273Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_360_1864">
        <rect
          width="33.4054"
          height="33.4054"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaCloseIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <line
      x1="5"
      y1="5"
      x2="19"
      y2="19"
      stroke="white"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <line
      x1="19"
      y1="5"
      x2="5"
      y2="19"
      stroke="white"
      stroke-width="2.2"
      stroke-linecap="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaCommunityIcon.vue
```vue
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0001 9.16675C11.4251 9.16675 12.5001 8.09175 12.5001 6.66675C12.5001 5.24175 11.4251 4.16675 10.0001 4.16675C8.57508 4.16675 7.50008 5.24175 7.50008 6.66675C7.50008 8.09175 8.57508 9.16675 10.0001 9.16675ZM10.0001 5.83341C10.5001 5.83341 10.8334 6.16675 10.8334 6.66675C10.8334 7.16675 10.5001 7.50008 10.0001 7.50008C9.50008 7.50008 9.16675 7.16675 9.16675 6.66675C9.16675 6.16675 9.50008 5.83341 10.0001 5.83341ZM10.8334 10.0001H9.16675C6.86675 10.0001 5.00008 11.8667 5.00008 14.1667V14.5834C5.00008 15.2751 5.55841 15.8334 6.25008 15.8334H13.7501C14.4417 15.8334 15.0001 15.2751 15.0001 14.5834V14.1667C15.0001 11.8667 13.1334 10.0001 10.8334 10.0001ZM6.66675 14.1667C6.66675 12.7917 7.79175 11.6667 9.16675 11.6667H10.8334C12.2084 11.6667 13.3334 12.7917 13.3334 14.1667H6.66675ZM5.41675 9.16675C5.80841 9.16675 6.16675 9.06675 6.47508 8.89175C6.12558 8.33528 5.9118 7.70444 5.851 7.05014C5.79021 6.39584 5.88409 5.73641 6.12508 5.12508C5.90841 5.05008 5.66675 5.00008 5.41675 5.00008C4.21675 5.00008 3.33341 5.88341 3.33341 7.08341C3.33341 8.28341 4.21675 9.16675 5.41675 9.16675ZM5.09175 10.0001H4.58341C2.97508 10.0001 1.66675 11.3084 1.66675 12.9167V13.7501C1.66675 13.9834 1.85008 14.1667 2.08341 14.1667H3.33341C3.33341 12.5334 4.00841 11.0584 5.09175 10.0001ZM14.5834 9.16675C15.7834 9.16675 16.6667 8.28341 16.6667 7.08341C16.6667 5.88341 15.7834 5.00008 14.5834 5.00008C14.3251 5.00008 14.0917 5.05008 13.8751 5.12508C14.1161 5.73641 14.21 6.39584 14.1492 7.05014C14.0884 7.70444 13.8746 8.33528 13.5251 8.89175C13.8334 9.06675 14.1834 9.16675 14.5834 9.16675ZM15.4167 10.0001H14.9084C15.4652 10.5417 15.9077 11.1896 16.2098 11.9053C16.5118 12.6209 16.6672 13.3899 16.6667 14.1667H17.9167C18.1501 14.1667 18.3334 13.9834 18.3334 13.7501V12.9167C18.3334 11.3084 17.0251 10.0001 15.4167 10.0001Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaCompanyIcon.vue
```vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 15H16V17H18M18 11H16V13H18M20 19H12V17H14V15H12V13H14V11H12V9H20M10 7H8V5H10M10 11H8V9H10M10 15H8V13H10M10 19H8V17H10M6 7H4V5H6M6 11H4V9H6M6 15H4V13H6M6 19H4V17H6M12 7V3H2V21H22V7H12Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaDangerIcon.vue
```vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5874 4.23461L19.7393 14.4811C20.6234 15.9528 20.1892 17.889 18.7689 18.8052C18.2926 19.1145 17.7367 19.279 17.1688 19.2789H4.86395C3.19216 19.2789 1.83618 17.8743 1.83618 16.1401C1.83618 15.5534 1.99501 14.9796 2.29338 14.4811L8.44624 4.23461C9.32941 2.76296 11.1968 2.31219 12.617 3.22841C13.0099 3.4818 13.3423 3.82607 13.5874 4.23461ZM11.5493 5.00487C11.4369 4.93258 11.311 4.88382 11.1793 4.86154C11.0475 4.83926 10.9126 4.84392 10.7827 4.87524C10.6528 4.90656 10.5305 4.96388 10.4234 5.04376C10.3163 5.12363 10.2264 5.2244 10.1593 5.33996L4.0074 15.5883C3.90747 15.7553 3.85479 15.9463 3.855 16.141C3.855 16.7194 4.30669 17.1876 4.86487 17.1876H17.1678C17.357 17.1876 17.5415 17.1325 17.7012 17.0297C17.9305 16.8774 18.0921 16.6425 18.1525 16.374C18.2128 16.1055 18.1673 15.8241 18.0253 15.5883L11.8734 5.33996C11.7932 5.20462 11.6826 5.08987 11.5502 5.00487H11.5493ZM11.0168 15.6067C10.7733 15.6067 10.5398 15.5099 10.3676 15.3378C10.1955 15.1656 10.0988 14.9321 10.0988 14.6886C10.0988 14.4451 10.1955 14.2116 10.3676 14.0394C10.5398 13.8673 10.7733 13.7705 11.0168 13.7705C11.2603 13.7705 11.4938 13.8673 11.666 14.0394C11.8382 14.2116 11.9349 14.4451 11.9349 14.6886C11.9349 14.9321 11.8382 15.1656 11.666 15.3378C11.4938 15.5099 11.2603 15.6067 11.0168 15.6067ZM11.0168 7.34409C11.2603 7.34409 11.4938 7.44082 11.666 7.61299C11.8382 7.78516 11.9349 8.01867 11.9349 8.26216V11.9344C11.9349 12.1779 11.8382 12.4114 11.666 12.5836C11.4938 12.7557 11.2603 12.8525 11.0168 12.8525C10.7733 12.8525 10.5398 12.7557 10.3676 12.5836C10.1955 12.4114 10.0988 12.1779 10.0988 11.9344V8.26216C10.0988 8.01867 10.1955 7.78516 10.3676 7.61299C10.5398 7.44082 10.7733 7.34409 11.0168 7.34409Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaEmailIcon.vue
```vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaHamburgerIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <line
      x1="4"
      y1="7"
      x2="20"
      y2="7"
      stroke="white"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <line
      x1="4"
      y1="12"
      x2="20"
      y2="12"
      stroke="white"
      stroke-width="2.2"
      stroke-linecap="round"
    />
    <line
      x1="4"
      y1="17"
      x2="20"
      y2="17"
      stroke="white"
      stroke-width="2.2"
      stroke-linecap="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaInfoIcon.vue
```vue
<template>
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9449 8.26976H10.1072V6.43208H11.9449M11.9449 15.6205H10.1072V10.1074H11.9449M11.026 1.83789C9.8194 1.83789 8.62458 2.07556 7.50979 2.53731C6.395 2.99907 5.38208 3.67589 4.52886 4.52911C2.80571 6.25226 1.83765 8.58937 1.83765 11.0263C1.83765 13.4632 2.80571 15.8003 4.52886 17.5234C5.38208 18.3767 6.395 19.0535 7.50979 19.5152C8.62458 19.977 9.8194 20.2147 11.026 20.2147C13.4629 20.2147 15.8 19.2466 17.5232 17.5234C19.2464 15.8003 20.2144 13.4632 20.2144 11.0263C20.2144 9.81964 19.9768 8.62482 19.515 7.51003C19.0532 6.39525 18.3764 5.38233 17.5232 4.52911C16.67 3.67589 15.6571 2.99907 14.5423 2.53731C13.4275 2.07556 12.2327 1.83789 11.026 1.83789Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaJumpToPageIcon.vue
```vue
<template>
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_293_154)">
      <path
        d="M6.75 5.25L10.5 1.5M10.5 4V1.5H8M10.5 7V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V2.5C1.5 2.23478 1.60536 1.98043 1.79289 1.79289C1.98043 1.60536 2.23478 1.5 2.5 1.5H5"
        stroke="#258966"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_293_154">
        <rect
          width="12"
          height="12"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaMapPinIcon.vue
```vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.7255 4.57511C13.2749 4.57511 12.8287 4.66387 12.4124 4.83631C11.9961 5.00875 11.6178 5.26151 11.2992 5.58014C10.9805 5.89877 10.7278 6.27704 10.5553 6.69336C10.3829 7.10967 10.2941 7.55587 10.2941 8.00649C10.2941 8.4571 10.3829 8.9033 10.5553 9.31962C10.7278 9.73593 10.9805 10.1142 11.2992 10.4328C11.6178 10.7515 11.9961 11.0042 12.4124 11.1767C12.8287 11.3491 13.2749 11.4379 13.7255 11.4379C14.6356 11.4379 15.5084 11.0763 16.1519 10.4328C16.7954 9.78933 17.1569 8.91654 17.1569 8.00649C17.1569 7.09643 16.7954 6.22365 16.1519 5.58014C15.5084 4.93663 14.6356 4.57511 13.7255 4.57511ZM8.00656 8.00649C8.00678 6.92443 8.31398 5.86463 8.89247 4.95019C9.47096 4.03575 10.297 3.30419 11.2747 2.84047C12.2523 2.37676 13.3415 2.19992 14.4156 2.33049C15.4898 2.46107 16.5049 2.8937 17.343 3.57814C18.181 4.26258 18.8078 5.17074 19.1503 6.19715C19.4929 7.22355 19.5372 8.32608 19.2782 9.37668C19.0192 10.4273 18.4674 11.3828 17.687 12.1324C16.9066 12.8819 15.9295 13.3946 14.8693 13.6111V19.4444C14.8693 19.7477 14.7488 20.0387 14.5343 20.2532C14.3198 20.4677 14.0289 20.5882 13.7255 20.5882C13.4222 20.5882 13.1312 20.4677 12.9167 20.2532C12.7022 20.0387 12.5817 19.7477 12.5817 19.4444V13.6111C11.29 13.3474 10.129 12.6455 9.29526 11.6242C8.46154 10.6029 8.00629 9.32488 8.00656 8.00649ZM10.8535 18.415C10.8762 18.5635 10.8695 18.7151 10.8336 18.8611C10.7977 19.007 10.7334 19.1445 10.6444 19.2656C10.5554 19.3867 10.4434 19.489 10.3148 19.5668C10.1862 19.6446 10.0435 19.6963 9.89496 19.7189C8.43319 19.9408 7.27225 20.2782 6.50934 20.6511C5.11391 21.3339 6.74496 21.8246 7.59594 22.09C9.11375 22.5647 11.2812 22.8758 13.7255 22.8758C16.1698 22.8758 18.3373 22.5647 19.8551 22.09C20.7118 21.8223 22.3371 21.3351 20.9417 20.6511C20.1788 20.2782 19.0178 19.9419 17.5561 19.7189C17.4059 19.6983 17.2612 19.648 17.1306 19.571C17 19.494 16.886 19.3918 16.7953 19.2703C16.7045 19.1489 16.6388 19.0106 16.602 18.8635C16.5652 18.7164 16.558 18.5635 16.5808 18.4136C16.6036 18.2637 16.656 18.1198 16.7349 17.9903C16.8138 17.8609 16.9177 17.7484 17.0405 17.6595C17.1633 17.5705 17.3026 17.5068 17.4502 17.4722C17.5978 17.4376 17.7508 17.4326 17.9004 17.4576C19.4879 17.6978 20.8994 18.0833 21.9482 18.5968C22.9593 19.0921 24.0196 19.9259 24.0196 21.1601C24.0196 22.0877 23.4203 22.7614 22.837 23.1926C20.3778 25.0089 16.6262 25.1633 13.7255 25.1633C11.1154 25.1633 8.7077 24.8339 6.91424 24.2735C5.4845 23.8274 3.4314 22.9467 3.4314 21.1601C3.4314 19.9248 4.49169 19.0921 5.5028 18.598C6.55166 18.0833 7.96424 17.699 9.54953 17.4576C9.69809 17.4349 9.84968 17.4416 9.99564 17.4775C10.1416 17.5134 10.279 17.5776 10.4001 17.6667C10.5212 17.7557 10.6236 17.8677 10.7014 17.9963C10.7792 18.1249 10.8308 18.2664 10.8535 18.415Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaStarShineIcon.vue
```vue
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4275 12.25C16.6564 12.25 16.8541 12.3333 17.0208 12.5L18.3333 13.8333C18.5 14 18.5833 14.1944 18.5833 14.4167C18.5833 14.6389 18.5 14.8333 18.3333 15C18.1666 15.1667 17.9722 15.25 17.75 15.25C17.5277 15.25 17.3333 15.1667 17.1666 15L15.8333 13.6875C15.6666 13.5208 15.5833 13.3231 15.5833 13.0942C15.5833 12.8653 15.6666 12.6672 15.8333 12.5C16 12.3328 16.198 12.2494 16.4275 12.25ZM16.9166 3.09417C16.9166 3.32306 16.8333 3.52084 16.6666 3.6875L15.3541 5C15.1875 5.16667 14.9897 5.25 14.7608 5.25C14.5319 5.25 14.3339 5.16667 14.1666 5C13.9994 4.83334 13.9161 4.63556 13.9166 4.40667C13.9172 4.17778 14.0005 3.97972 14.1666 3.8125L15.5 2.5C15.6666 2.33334 15.8611 2.25 16.0833 2.25C16.3055 2.25 16.5 2.33334 16.6666 2.5C16.8333 2.66667 16.9166 2.86445 16.9166 3.09334M3.92746 2.25C4.15635 2.25 4.35413 2.33334 4.5208 2.5L5.83329 3.83334C5.99996 4 6.0833 4.19445 6.0833 4.41667C6.0833 4.63889 5.99996 4.83334 5.83329 5C5.66663 5.16667 5.46885 5.25 5.23996 5.25C5.01107 5.25 4.81302 5.16667 4.6458 5L3.3333 3.6875C3.16663 3.52084 3.0833 3.32306 3.0833 3.09417C3.0833 2.86528 3.16663 2.66722 3.3333 2.5C3.49996 2.33278 3.69802 2.24945 3.92746 2.25ZM4.41663 13.0942C4.41663 13.3231 4.3333 13.5208 4.16663 13.6875L2.85413 15C2.68746 15.1667 2.48968 15.25 2.2608 15.25C2.03191 15.25 1.83385 15.1667 1.66663 15C1.49941 14.8333 1.41607 14.6356 1.41663 14.4067C1.41718 14.1778 1.50052 13.9797 1.66663 13.8125L2.99996 12.5C3.16663 12.3333 3.36107 12.25 3.5833 12.25C3.80552 12.25 3.99996 12.3333 4.16663 12.5C4.3333 12.6667 4.41663 12.8647 4.41663 13.0942ZM7.37496 14.0208L9.99996 12.4375L12.625 14.0417L11.9375 11.0417L14.25 9.04167L11.2083 8.77084L9.99996 5.9375L8.79163 8.75L5.74996 9.02084L8.06246 11.0417L7.37496 14.0208ZM9.99996 14.3958L6.54163 16.4792C6.38885 16.5764 6.22913 16.6181 6.06246 16.6042C5.8958 16.5903 5.74996 16.5347 5.62496 16.4375C5.49996 16.3403 5.40274 16.2189 5.3333 16.0733C5.26385 15.9278 5.24996 15.7644 5.29163 15.5833L6.20829 11.6458L3.1458 9C3.00691 8.875 2.92024 8.7325 2.8858 8.5725C2.85135 8.4125 2.86163 8.25639 2.91663 8.10417C2.97163 7.95195 3.05496 7.82695 3.16663 7.72917C3.2783 7.63139 3.43107 7.56889 3.62496 7.54167L7.66663 7.1875L9.22913 3.47917C9.29857 3.3125 9.40635 3.1875 9.55246 3.10417C9.69857 3.02084 9.84774 2.97917 9.99996 2.97917C10.1522 2.97917 10.3014 3.02084 10.4475 3.10417C10.5936 3.1875 10.7014 3.3125 10.7708 3.47917L12.3333 7.1875L16.375 7.54167C16.5694 7.56945 16.7222 7.63195 16.8333 7.72917C16.9444 7.82639 17.0277 7.95139 17.0833 8.10417C17.1389 8.25695 17.1494 8.41334 17.115 8.57334C17.0805 8.73334 16.9936 8.87556 16.8541 9L13.7916 11.6458L14.7083 15.5833C14.75 15.7639 14.7361 15.9272 14.6666 16.0733C14.5972 16.2194 14.5 16.3408 14.375 16.4375C14.25 16.5342 14.1041 16.5897 13.9375 16.6042C13.7708 16.6186 13.6111 16.5769 13.4583 16.4792L9.99996 14.3958Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaSunIcon.vue
```vue
<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 10V6M24 42V38M14.1 14.1L11.272 11.272M36.728 36.728L33.9 33.9M10 24H6M42 24H38M14.1 33.9L11.272 36.728M36.728 11.272L33.9 14.1M32 24C32 26.1217 31.1571 28.1566 29.6569 29.6569C28.1566 31.1571 26.1217 32 24 32C21.8783 32 19.8434 31.1571 18.3431 29.6569C16.8429 28.1566 16 26.1217 16 24C16 21.8783 16.8429 19.8434 18.3431 18.3431C19.8434 16.8429 21.8783 16 24 16C26.1217 16 28.1566 16.8429 29.6569 18.3431C31.1571 19.8434 32 21.8783 32 24Z"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaSunsetIcon.vue
```vue
<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 26H8M40 26H42M11.2 13.2L12.6 14.6M36.8 13.2L35.4 14.6M16 26C16 23.8783 16.8429 21.8434 18.3431 20.3431C19.8434 18.8429 21.8783 18 24 18C26.1217 18 28.1566 18.8429 29.6569 20.3431C31.1571 21.8434 32 23.8783 32 26M6 34H42M14 40H24M32 40H34M24 10V8"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaTicketIcon.vue
```vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_350_141)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.166 6.25412L24.7303 8.35938C24.8054 8.64034 24.8009 8.93667 24.7173 9.21522C24.6336 9.49377 24.4741 9.74355 24.2566 9.93662L24.1807 10.0003C23.8068 10.2919 23.5257 10.6858 23.3713 11.1342C23.2169 11.5825 23.1959 12.066 23.311 12.526C23.426 12.986 23.672 13.4027 24.0193 13.7256C24.3665 14.0485 24.8 14.2637 25.2671 14.345L25.3729 14.3612C25.6689 14.3999 25.9466 14.5255 26.1712 14.7221C26.3957 14.9188 26.5568 15.1775 26.6342 15.4658L27.2088 17.6092C27.2755 17.8578 27.2925 18.117 27.259 18.3722C27.2255 18.6273 27.142 18.8734 27.0134 19.0962C26.8847 19.3191 26.7135 19.5145 26.5093 19.6712C26.3052 19.8278 26.0722 19.9428 25.8236 20.0094L5.95141 25.3338C5.44951 25.4681 4.9148 25.3976 4.46488 25.1377C4.01496 24.8779 3.68669 24.4499 3.55225 23.948L3.01197 21.9314C2.93174 21.6313 2.9348 21.315 3.02085 21.0165C3.10689 20.7179 3.27266 20.4485 3.50033 20.2371L3.58017 20.1686C3.94623 19.8699 4.21812 19.4718 4.36309 19.0222C4.50805 18.5725 4.51991 18.0906 4.39722 17.6343C4.27453 17.1781 4.02254 16.7671 3.6716 16.4508C3.32067 16.1345 2.88576 15.9265 2.41929 15.8517C2.09666 15.7997 1.79597 15.6555 1.55342 15.4365C1.31086 15.2175 1.1368 14.933 1.05219 14.6174L0.509461 12.5929C0.44288 12.3444 0.425921 12.0851 0.459554 11.83C0.493187 11.5748 0.576753 11.3288 0.705479 11.106C0.834205 10.8831 1.00557 10.6878 1.20978 10.5312C1.414 10.3746 1.64706 10.2598 1.89566 10.1933L21.7664 4.86889C22.0149 4.80222 22.2742 4.78517 22.5293 4.8187C22.7845 4.85224 23.0305 4.9357 23.2534 5.06434C23.4763 5.19297 23.6716 5.36425 23.8283 5.5684C23.985 5.77254 24.0999 6.00555 24.1665 6.25412M22.1264 6.55144L2.42516 11.8303C2.15331 11.9033 1.99167 12.183 2.06465 12.4548L2.45211 13.9013C3.28996 14.0701 4.06404 14.4695 4.68714 15.0545C5.31024 15.6395 5.7576 16.3869 5.97884 17.2125C6.20011 18.0381 6.18644 18.9091 5.93936 19.7273C5.69228 20.5456 5.22162 21.2786 4.58039 21.8438L4.96784 23.2902C5.04132 23.5621 5.32052 23.7237 5.59237 23.6507L25.2931 18.3719C25.565 18.2989 25.7266 18.0192 25.6536 17.7474L25.2667 16.3014C24.4287 16.1325 23.6546 15.7331 23.0315 15.148C22.4084 14.5628 21.9611 13.8153 21.7399 12.9897C21.5186 12.1641 21.5322 11.2932 21.7792 10.4749C22.0262 9.65666 22.4967 8.92363 23.1379 8.3584L22.7504 6.91195C22.7331 6.84724 22.7033 6.78657 22.6625 6.73342C22.6218 6.68026 22.5709 6.63566 22.5129 6.60218C22.4549 6.56869 22.3909 6.54698 22.3245 6.53827C22.2581 6.52956 22.1911 6.53404 22.1264 6.55144ZM21.4975 17.1116C21.5474 17.298 21.5601 17.4924 21.5349 17.6837C21.5096 17.875 21.447 18.0595 21.3505 18.2266C21.2539 18.3938 21.1255 18.5402 20.9723 18.6577C20.8192 18.7751 20.6445 18.8613 20.458 18.9112C20.2716 18.9611 20.0772 18.9738 19.8859 18.9486C19.6946 18.9234 19.5101 18.8607 19.343 18.7642C19.1759 18.6677 19.0294 18.5392 18.9119 18.3861C18.7945 18.2329 18.7084 18.0582 18.6584 17.8718C18.5576 17.4953 18.6105 17.0942 18.8054 16.7567C19.0004 16.4192 19.3214 16.173 19.6978 16.0722C20.0743 15.9713 20.4754 16.0242 20.8129 16.2192C21.1504 16.4141 21.3966 16.7351 21.4975 17.1116ZM20.4835 13.3262C20.5844 13.7027 20.5316 14.1038 20.3367 14.4414C20.1418 14.7789 19.8208 15.0252 19.4444 15.1261C19.0679 15.2269 18.6667 15.1741 18.3292 14.9792C17.9917 14.7844 17.7454 14.4634 17.6445 14.0869C17.5494 13.7124 17.6056 13.3155 17.8009 12.9821C17.9963 12.6488 18.3151 12.4058 18.6884 12.3057C19.0616 12.2057 19.4592 12.2567 19.7951 12.4477C20.131 12.6387 20.3786 12.9543 20.4835 13.3262ZM19.4686 9.54133C19.5186 9.72774 19.5313 9.92217 19.5061 10.1135C19.4809 10.3048 19.4183 10.4893 19.3218 10.6565C19.2253 10.8236 19.0968 10.9701 18.9437 11.0876C18.7906 11.2051 18.6159 11.2912 18.4294 11.3412C18.243 11.3911 18.0486 11.4039 17.8573 11.3787C17.6659 11.3535 17.4814 11.2909 17.3143 11.1944C17.1472 11.0979 17.0007 10.9694 16.8832 10.8163C16.7657 10.6632 16.6795 10.4884 16.6296 10.302C16.5287 9.92555 16.5815 9.52442 16.7764 9.18688C16.9713 8.84934 17.2923 8.60304 17.6687 8.50217C18.0452 8.40129 18.4464 8.4541 18.7839 8.64899C19.1214 8.84387 19.3677 9.16485 19.4686 9.54133ZM14.3926 3.10896L15.6426 4.89388C15.6609 4.92033 15.6783 4.9471 15.695 4.97421L3.73593 8.17864L11.6637 2.62746C12.0894 2.32958 12.616 2.21297 13.1276 2.30326C13.6392 2.39356 14.0946 2.68337 14.3926 3.10896Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_350_141">
        <rect
          width="27.4302"
          height="27.4302"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaTimerIcon.vue
```vue
<template>
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.2863 3.42879V1.14294H17.1438V3.42879H10.2863ZM12.5721 16.001H14.8579V9.14341H12.5721V16.001ZM9.72851 24.3306C8.4812 23.7873 7.39085 23.049 6.45746 22.1156C5.52407 21.1822 4.78612 20.0915 4.24362 18.8434C3.70111 17.5953 3.42947 16.2669 3.42871 14.858C3.42795 13.4492 3.69959 12.1203 4.24362 10.8715C4.78765 9.62268 5.5256 8.53233 6.45746 7.60046C7.38932 6.6686 8.48005 5.93065 9.72965 5.38662C10.9792 4.84259 12.3077 4.57095 13.715 4.57172C14.896 4.57172 16.0294 4.7622 17.1152 5.14318C18.201 5.52415 19.2201 6.07656 20.1725 6.80042L21.7726 5.20032L23.3727 6.80042L21.7726 8.40051C22.4965 9.35295 23.0489 10.3721 23.4299 11.4578C23.8109 12.5436 24.0013 13.677 24.0013 14.858C24.0013 16.2676 23.7297 17.5965 23.1864 18.8445C22.6432 20.0926 21.9052 21.183 20.9726 22.1156C20.04 23.0482 18.9492 23.7865 17.7004 24.3306C16.4516 24.8746 15.1231 25.1459 13.715 25.1443C12.3069 25.1428 10.9781 24.8716 9.72851 24.3306ZM19.3725 20.5155C20.9345 18.9535 21.7155 17.0677 21.7155 14.858C21.7155 12.6484 20.9345 10.7626 19.3725 9.20056C17.8105 7.63856 15.9247 6.85756 13.715 6.85756C11.5054 6.85756 9.61955 7.63856 8.05755 9.20056C6.49556 10.7626 5.71456 12.6484 5.71456 14.858C5.71456 17.0677 6.49556 18.9535 8.05755 20.5155C9.61955 22.0775 11.5054 22.8585 13.715 22.8585C15.9247 22.8585 17.8105 22.0775 19.3725 20.5155Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaWorldIcon.vue
```vue
<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 7.5H17M3 12.5H17M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5C8.01088 2.5 6.10322 3.29018 4.6967 4.6967C3.29018 6.10322 2.5 8.01088 2.5 10Z"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.58322 2.5C8.17934 4.74968 7.43506 7.34822 7.43506 10C7.43506 12.6518 8.17934 15.2503 9.58322 17.5M10.4166 2.5C11.8204 4.74968 12.5647 7.34822 12.5647 10C12.5647 12.6518 11.8204 15.2503 10.4166 17.5"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/HaCommingSoon.vue
```vue
<template>
  <div class="comming-soon">
    <span class="comming-soon__en">comming soon</span>
    <span class="comming-soon__jp">続報をお待ちください...</span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.comming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 480px;
    margin: 0 auto;

    @include m.tb {
        height: 240px;
    }

    @include m.sp {
        height: 160px;
    }

    &__en {
        font-size: 48px;
        font-weight: 700;
        text-align: center;

        @include m.sp {
            font-size: 32px;
        }
    }

    &__jp {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }
}
</style>
```

## File: layers/main/app/components/ha/HaPageTitle.vue
```vue
<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="page-title">
    <div class="page-title__flex">
      <div class="page-title__text-box">
        <p class="page-title__label">
          {{ label }}
        </p>
        <h2 class="page-title__text">
          {{ title }}
        </h2>
      </div>
      <div class="page-title__controls">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.page-title {
  position: relative;
  margin-bottom: 48px;

  @include m.tb {
    margin-bottom: 32px;
  }

  &__line {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 2px;
    margin-bottom: 4px;

  }

  &__flex {
    display: flex;
    justify-content: space-between;
    height: 130px;
    border-bottom: 1px solid white;

    @include m.sp {
        height: 85px;
    }
  }

  &__label {
    font-size: 12px;
    color: v.$vket-amber;
    letter-spacing: 0.1em;

    @include m.tb {
      font-size: 10px;
    }
  }

  &__text {
    font-size: 48px;
    font-weight: 700;
    line-height: 1em;
    color: #fff;

    @include m.tb {
      font-size: 40px;
    }

    @include m.sp {
      font-size: 32px;
    }
  }

  &__controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
}
</style>
```

## File: layers/main/app/components/ha/HaShimmer.vue
```vue
<template>
  <component
    :is="as"
    class="shimmer-wrap"
    :class="{ 'shimmer-wrap--loading': loading }"
    :style="{
      minHeight: loading ? minHeight : undefined,
      minWidth: loading ? minWidth : undefined,
    }"
  >
    <slot />
    <div
      v-if="loading"
      class="shimmer"
    />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loading: boolean
    as?: string
    minHeight?: string
    minWidth?: string
  }>(),
  {
    as: 'div',
    minHeight: '1em',
    minWidth: '4em',
  },
)
</script>

<style scoped lang="scss">
.shimmer-wrap {
  position: relative;

  &--loading {
    visibility: hidden;

    > .shimmer {
      visibility: visible;
    }
  }
}

.shimmer {
  pointer-events: none;

  position: absolute;
  z-index: calc(var(--parent-z, 0) + 1);
  inset: 0;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    rgb(217 217 217 / 100%) 0%,
    rgb(200 200 200 / 100%) 40%,
    rgb(232 232 232 / 100%) 50%,
    rgb(200 200 200 / 100%) 60%,
    rgb(217 217 217 / 100%) 100%
  );
  background-size: 200% 100%;

  animation: shimmer 1.6s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
```

## File: layers/main/app/components/hm/HmContentsSwiper.vue
```vue
<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import HaContentCard from '../ha/HaContentCard.vue'
import HaCommingSoonCard from '../ha/HaCommingSoonCard.vue'

// スライドの型
type SlideItem = {
  id: number
  title: string
  href: string
  text: string
}

// ブレークポイントごとのSlidesPerViewの型
type BreakpointSlidesPerView = {
  [width: number]: {
    slidesPerView: number | 'auto'
  }
}

defineProps<{
  items?: SlideItem[]
  _slidesPerView?: number | 'auto'
  _breakpoints?: BreakpointSlidesPerView
}>()

const modules = [Autoplay, Navigation, Pagination]

const emit = defineEmits<{
  slideChange: [isBeginning: boolean, isEnd: boolean]
}>()

const swiperInstance = ref<SwiperType | null>(null)

const updateState = (swiper: SwiperType) => {
  emit('slideChange', swiper.isBeginning, swiper.isEnd)
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  updateState(swiper)
}

const onSlideChange = (swiper: SwiperType) => {
  updateState(swiper)
}

defineExpose({ swiperInstance })
</script>

<template>
  <div class="works-swiper mb-25">
    <Swiper
      :slides-per-view="_slidesPerView ?? 'auto'"
      :breakpoints="_breakpoints"
      :speed="1000"
      :autoplay="{ delay: 3000, stopOnLastSlide: true }"
      :modules="modules"
      :centered-slides="false"
      :space-between="28"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{
        el: '.custom-swiper-pagination',
        clickable: true,
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
      >
        <HaContentCard :item="item" />
      </SwiperSlide>
      <SwiperSlide
        key="comming-soon"
      >
        <HaCommingSoonCard />
      </SwiperSlide>
    </Swiper>
    <div class="custom-swiper-pagination" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  overflow: visible;
}
</style>
```

## File: layers/main/app/components/hm/HmNewsSwiper.vue
```vue
<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HaSwiperCard from '../ha/HaSwiperCard.vue'
import type { Swiper as SwiperType } from 'swiper'

// スライドの型
type SlideItem = {
  id: number
  title: string
  href: string
  imgSrc: string
  timestamp: string
}

// ブレークポイントごとのSlidesPerViewの型
type BreakpointSlidesPerView = {
  [width: number]: {
    slidesPerView: number | 'auto'
  }
}

defineProps<{
  items?: SlideItem[]
  _slidesPerView?: number | 'auto'
  _breakpoints?: BreakpointSlidesPerView
}>()

const modules = [Autoplay, Navigation, Pagination]

const emit = defineEmits<{
  slideChange: [isBeginning: boolean, isEnd: boolean]
}>()

const swiperInstance = ref<SwiperType | null>(null)

const updateState = (swiper: SwiperType) => {
  emit('slideChange', swiper.isBeginning, swiper.isEnd)
}

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  updateState(swiper)
}

const onSlideChange = (swiper: SwiperType) => {
  updateState(swiper)
}

defineExpose({ swiperInstance })
</script>

<template>
  <div class="works-swiper mb-25">
    <Swiper
      :slides-per-view="_slidesPerView ?? 'auto'"
      :breakpoints="_breakpoints"
      :speed="1000"
      :autoplay="{ delay: 3000, stopOnLastSlide: true }"
      :modules="modules"
      :centered-slides="false"
      :space-between="28"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{
        el: '.custom-swiper-pagination',
        clickable: true,
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide
        v-for="item in items"
        :key="item.id"
      >
        <HaSwiperCard :item="item" />
      </SwiperSlide>
    </Swiper>
    <div class="custom-swiper-pagination" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  overflow: visible;
}
</style>
```

## File: layers/main/app/components/ht/HtParticipationGuide.vue
```vue
<script setup lang="ts">
import HaCommingSoon from '../ha/HaCommingSoon.vue'

const { t: tGlobal } = useI18n()
</script>

<template>
  <HaSectionTitle
    label="PARTICIPATION GUIDE"
    :title="tGlobal('sectionTitle.participationGuide')"
  />
  <HaCommingSoon />
</template>
```

## File: layers/main/app/components/ha/buildings/HaAstyLoading.vue
```vue
<template>
  <svg
    viewBox="0 0 269 173"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="159.096"
      height="85.5081"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8297 110.497)"
      fill="url(#paint0_linear_690_685)"
    />
    <path
      d="M24.0251 125.026V110.491L97.8948 153.093V167.626L24.0251 125.026Z"
      fill="url(#paint1_linear_690_685)"
    />
    <path
      d="M97.8948 153.289V167.626L235.472 88.2839V73.9473L97.8948 153.289Z"
      fill="url(#paint2_linear_690_685)"
    />
    <g filter="url(#filter0_f_690_685)">
      <rect
        width="167.407"
        height="93.9689"
        transform="matrix(0.866044 -0.499967 0.866044 0.499967 21.0938 104.792)"
        fill="#ACBABF"
        fill-opacity="0.25"
      />
    </g>
    <rect
      width="158.315"
      height="85.0886"
      transform="matrix(0.866044 -0.499967 0.866044 0.499967 23.8163 99.8572)"
      fill="#D9D9D9"
    />
    <path
      d="M234.615 56.2449L170.871 93.0447H24.1425L23.8163 92.8562L160.925 13.7039L234.615 56.2449Z"
      fill="#D9D9D9"
    />
    <path
      d="M97.3235 142.321C97.314 142.297 97.307 142.272 97.3069 142.245V135.438C97.3069 135.411 97.3138 135.386 97.3235 135.361V142.321ZM234.315 56.3037C234.38 56.2661 234.46 56.2661 234.526 56.3037C234.591 56.3414 234.631 56.411 234.631 56.4863V63.293C234.631 63.3681 234.591 63.438 234.526 63.4756L183.252 93.0449H170.606L234.315 56.3037Z"
      fill="#D9D9D9"
    />
    <path
      d="M170.883 100.045H23.8163V93.0449H183.163L170.883 100.045Z"
      fill="#D9D9D9"
    />
    <defs>
      <filter
        id="filter0_f_690_685"
        x="0"
        y="0"
        width="268.551"
        height="172.867"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="10.5469"
          result="effect1_foregroundBlur_690_685"
        />
      </filter>
      <linearGradient
        id="paint0_linear_690_685"
        x1="79.5479"
        y1="85.5081"
        x2="79.5479"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint1_linear_690_685"
        x1="60.96"
        y1="167.626"
        x2="60.96"
        y2="110.491"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
      <linearGradient
        id="paint2_linear_690_685"
        x1="166.684"
        y1="167.626"
        x2="166.684"
        y2="73.9473"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/buildings/HaDTCLoading.vue
```vue
<template>
  <svg
    viewBox="0 0 288 187"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44.5447 93.7959C44.4581 93.7471 44.3516 93.748 44.2654 93.7979C44.1786 93.8482 44.1248 93.9407 44.1248 94.041V114.476C44.1249 114.576 44.1793 114.67 44.2664 114.72L143.281 171.749L144.613 172.521C144.63 172.597 144.677 172.664 144.746 172.704C144.833 172.754 144.94 172.754 145.027 172.704L226.264 125.479L243.539 115.525L243.457 115.477C243.52 115.424 243.558 115.346 243.558 115.263V94.707L243.802 94.5674L243.487 94.3838C243.467 94.3614 243.444 94.3416 243.418 94.3262C243.392 94.3111 243.364 94.3009 243.335 94.2949L143.837 36.4746L44.5447 93.7959Z"
      fill="url(#paint0_linear_690_720)"
    />
    <g filter="url(#filter0_f_690_720)">
      <path
        d="M259.803 91.5137L137.927 28.1248L28.125 91.5137L146.982 158.001L259.803 91.5137Z"
        fill="#ACBABF"
        fill-opacity="0.25"
      />
    </g>
    <path
      d="M244.848 86.1098L144.605 27.9243L45.7042 85.0603L145.922 143.108L244.848 86.1098Z"
      fill="#D9D9D9"
    />
    <path
      d="M46.2064 74.458L145.938 132.223L244.624 75.1518L145.145 17.3407L46.2064 74.458Z"
      fill="#D9D9D9"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <path
      d="M244.586 85.8473V75.1494L146.194 132.089V143.045L244.586 85.8473Z"
      fill="#D9D9D9"
    />
    <path
      d="M145.932 132.089V142.783L45.7147 85.0602V74.6294L145.932 132.089Z"
      fill="#D9D9D9"
      stroke="#D9D9D9"
      stroke-width="0.5625"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_f_690_720"
        x="0"
        y="0"
        width="287.928"
        height="186.126"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="14.0625"
          result="effect1_foregroundBlur_690_720"
        />
      </filter>
      <linearGradient
        id="paint0_linear_690_720"
        x1="143.963"
        y1="172.742"
        x2="143.963"
        y2="36.4746"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stop-color="#565656"
          stop-opacity="0.02"
        />
        <stop
          offset="1"
          stop-color="#BCBCBC"
          stop-opacity="0.2"
        />
      </linearGradient>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaBalanceIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33337 35.0002V31.6668H18.3334V13.0418C17.6112 12.7918 16.9862 12.4029 16.4584 11.8752C15.9306 11.3474 15.5417 10.7224 15.2917 10.0002H10L15 21.6668C15 23.0557 14.4306 24.2363 13.2917 25.2085C12.1528 26.1807 10.7778 26.6668 9.16671 26.6668C7.5556 26.6668 6.1806 26.1807 5.04171 25.2085C3.90282 24.2363 3.33337 23.0557 3.33337 21.6668L8.33337 10.0002H5.00004V6.66683H15.2917C15.625 5.69461 16.2223 4.89628 17.0834 4.27183C17.9445 3.64739 18.9167 3.33461 20 3.3335C21.0834 3.33239 22.0556 3.64517 22.9167 4.27183C23.7778 4.8985 24.375 5.69683 24.7084 6.66683H35V10.0002H31.6667L36.6667 21.6668C36.6667 23.0557 36.0973 24.2363 34.9584 25.2085C33.8195 26.1807 32.4445 26.6668 30.8334 26.6668C29.2223 26.6668 27.8473 26.1807 26.7084 25.2085C25.5695 24.2363 25 23.0557 25 21.6668L30 10.0002H24.7084C24.4584 10.7224 24.0695 11.3474 23.5417 11.8752C23.0139 12.4029 22.3889 12.7918 21.6667 13.0418V31.6668H36.6667V35.0002H3.33337ZM27.7084 21.6668H33.9584L30.8334 14.4168L27.7084 21.6668ZM6.04171 21.6668H12.2917L9.16671 14.4168L6.04171 21.6668ZM20 10.0002C20.4723 10.0002 20.8684 9.84017 21.1884 9.52017C21.5084 9.20017 21.6678 8.80461 21.6667 8.3335C21.6656 7.86239 21.5056 7.46683 21.1867 7.14683C20.8678 6.82683 20.4723 6.66683 20 6.66683C19.5278 6.66683 19.1323 6.82683 18.8134 7.14683C18.4945 7.46683 18.3345 7.86239 18.3334 8.3335C18.3323 8.80461 18.4923 9.20072 18.8134 9.52183C19.1345 9.84294 19.53 10.0024 20 10.0002Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaCameraIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3613 3.67206H15.4511L13.771 1.83594H8.26263L6.58257 3.67206H3.67231C3.18534 3.67206 2.71831 3.86551 2.37397 4.20985C2.02963 4.55419 1.83618 5.02122 1.83618 5.50819V16.525C1.83618 17.0119 2.02963 17.4789 2.37397 17.8233C2.71831 18.1676 3.18534 18.3611 3.67231 18.3611H18.3613C18.8483 18.3611 19.3153 18.1676 19.6597 17.8233C20.004 17.4789 20.1974 17.0119 20.1974 16.525V5.50819C20.1974 5.02122 20.004 4.55419 19.6597 4.20985C19.3153 3.86551 18.8483 3.67206 18.3613 3.67206ZM18.3613 16.525H3.67231V5.50819H7.39047L9.07052 3.67206H12.9631L14.6432 5.50819H18.3613V16.525ZM11.0168 6.42625C9.79939 6.42625 8.63182 6.90987 7.77097 7.77073C6.91012 8.63158 6.4265 9.79914 6.4265 11.0166C6.4265 12.234 6.91012 13.4016 7.77097 14.2624C8.63182 15.1233 9.79939 15.6069 11.0168 15.6069C12.2342 15.6069 13.4018 15.1233 14.2627 14.2624C15.1235 13.4016 15.6071 12.234 15.6071 11.0166C15.6071 9.79914 15.1235 8.63158 14.2627 7.77073C13.4018 6.90987 12.2342 6.42625 11.0168 6.42625ZM11.0168 13.7708C10.2864 13.7708 9.58582 13.4806 9.06931 12.9641C8.5528 12.4476 8.26263 11.747 8.26263 11.0166C8.26263 10.2861 8.5528 9.58557 9.06931 9.06906C9.58582 8.55255 10.2864 8.26238 11.0168 8.26238C11.7473 8.26238 12.4478 8.55255 12.9643 9.06906C13.4808 9.58557 13.771 10.2861 13.771 11.0166C13.771 11.747 13.4808 12.4476 12.9643 12.9641C12.4478 13.4806 11.7473 13.7708 11.0168 13.7708Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaChevronDownIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_278_53)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.4143 23.8735C18.9962 24.2911 18.4295 24.5257 17.8386 24.5257C17.2477 24.5257 16.6809 24.2911 16.2629 23.8735L7.852 15.4657C7.43389 15.0474 7.19908 14.4801 7.19922 13.8887C7.19936 13.2972 7.43444 12.7301 7.85274 12.312C8.27105 11.8939 8.83831 11.659 9.42975 11.6592C10.0212 11.6593 10.5883 11.8944 11.0064 12.3127L17.8386 19.1449L24.6707 12.3127C25.0911 11.9063 25.6543 11.6813 26.2389 11.6861C26.8236 11.6909 27.3829 11.9252 27.7966 12.3384C28.2102 12.7516 28.445 13.3108 28.4503 13.8954C28.4557 14.4801 28.2312 15.0434 27.8252 15.4642L19.4158 23.875L19.4143 23.8735Z"
        fill="#43FFBD"
      />
    </g>
    <defs>
      <clipPath id="clip0_278_53">
        <rect
          width="35.677"
          height="35.677"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaCircledQuestionIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 3.33301C29.205 3.33301 36.6667 10.7947 36.6667 19.9997C36.6667 29.2047 29.205 36.6663 20 36.6663C10.795 36.6663 3.33337 29.2047 3.33337 19.9997C3.33337 10.7947 10.795 3.33301 20 3.33301ZM20 6.66634C16.4638 6.66634 13.0724 8.0711 10.572 10.5716C8.07147 13.0721 6.66671 16.4635 6.66671 19.9997C6.66671 23.5359 8.07147 26.9273 10.572 29.4278C13.0724 31.9282 16.4638 33.333 20 33.333C23.5363 33.333 26.9276 31.9282 29.4281 29.4278C31.9286 26.9273 33.3334 23.5359 33.3334 19.9997C33.3334 16.4635 31.9286 13.0721 29.4281 10.5716C26.9276 8.0711 23.5363 6.66634 20 6.66634ZM20 26.6663C20.4421 26.6663 20.866 26.8419 21.1786 27.1545C21.4911 27.4671 21.6667 27.891 21.6667 28.333C21.6667 28.775 21.4911 29.199 21.1786 29.5115C20.866 29.8241 20.4421 29.9997 20 29.9997C19.558 29.9997 19.1341 29.8241 18.8215 29.5115C18.509 29.199 18.3334 28.775 18.3334 28.333C18.3334 27.891 18.509 27.4671 18.8215 27.1545C19.1341 26.8419 19.558 26.6663 20 26.6663ZM20 10.833C21.4038 10.8331 22.7638 11.3219 23.8463 12.2157C24.9289 13.1094 25.6664 14.3522 25.9322 15.7306C26.198 17.109 25.9756 18.537 25.303 19.7692C24.6305 21.0014 23.5498 21.9609 22.2467 22.483C22.0537 22.554 21.8797 22.6686 21.7384 22.818C21.665 22.9013 21.6534 23.008 21.655 23.118L21.6667 23.333C21.6662 23.7578 21.5036 24.1664 21.212 24.4753C20.9203 24.7842 20.5218 24.9701 20.0977 24.995C19.6736 25.0199 19.2561 24.8819 18.9303 24.6092C18.6046 24.3366 18.3952 23.9498 18.345 23.528L18.3334 23.333V22.9163C18.3334 20.9947 19.8834 19.8413 21.0067 19.3897C21.4639 19.2071 21.8627 18.9035 22.1603 18.5113C22.458 18.1192 22.6432 17.6534 22.696 17.1639C22.7489 16.6745 22.6674 16.1799 22.4604 15.7332C22.2534 15.2866 21.9286 14.9048 21.5209 14.6288C21.1133 14.3528 20.6381 14.1931 20.1465 14.1668C19.655 14.1405 19.1655 14.2486 18.7307 14.4795C18.2959 14.7103 17.9322 15.0553 17.6787 15.4773C17.4252 15.8993 17.2914 16.3824 17.2917 16.8747C17.2917 17.3167 17.1161 17.7406 16.8036 18.0532C16.491 18.3657 16.0671 18.5413 15.625 18.5413C15.183 18.5413 14.7591 18.3657 14.4465 18.0532C14.134 17.7406 13.9584 17.3167 13.9584 16.8747C13.9584 15.2723 14.5949 13.7356 15.7279 12.6026C16.861 11.4695 18.3977 10.833 20 10.833Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaHeartIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.1086 17.0298L11.0168 17.1216L10.9158 17.0298C6.55503 13.0729 3.67231 10.4565 3.67231 7.80325C3.67231 5.96713 5.0494 4.59003 6.88553 4.59003C8.29935 4.59003 9.67644 5.5081 10.163 6.75666H11.8706C12.3572 5.5081 13.7343 4.59003 15.1481 4.59003C16.9842 4.59003 18.3613 5.96713 18.3613 7.80325C18.3613 10.4565 15.4786 13.0729 11.1086 17.0298ZM15.1481 2.75391C13.5507 2.75391 12.0175 3.49754 11.0168 4.66348C10.0161 3.49754 8.48296 2.75391 6.88553 2.75391C4.05789 2.75391 1.83618 4.96644 1.83618 7.80325C1.83618 11.2644 4.9576 14.1012 9.68562 18.3885L11.0168 19.6004L12.348 18.3885C17.076 14.1012 20.1974 11.2644 20.1974 7.80325C20.1974 4.96644 17.9757 2.75391 15.1481 2.75391Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaOpenBookIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21V7M12 7C12 6.46957 12.2107 5.96086 12.5858 5.58579C12.9609 5.21071 13.4696 5 14 5H21.4C21.4788 5 21.5568 5.01552 21.6296 5.04567C21.7024 5.07583 21.7685 5.12002 21.8243 5.17574C21.88 5.23145 21.9242 5.29759 21.9543 5.37039C21.9845 5.44319 22 5.52121 22 5.6V18.714M12 7C12 6.46957 11.7893 5.96086 11.4142 5.58579C11.0391 5.21071 10.5304 5 10 5H2.6C2.44087 5 2.28826 5.06321 2.17574 5.17574C2.06321 5.28826 2 5.44087 2 5.6V18.714M14 19H22M10 19H2"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M14 19C13.4696 19 12.9609 19.2107 12.5858 19.5858C12.2107 19.9609 12 20.4696 12 21C12 20.4696 11.7893 19.9609 11.4142 19.5858C11.0391 19.2107 10.5304 19 10 19"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaPeopleFillIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10C12.4596 10 12.9148 9.90947 13.3394 9.73358C13.764 9.55769 14.1499 9.29988 14.4749 8.97487C14.7999 8.64987 15.0577 8.26403 15.2336 7.83939C15.4095 7.41475 15.5 6.95963 15.5 6.5C15.5 6.04037 15.4095 5.58525 15.2336 5.16061C15.0577 4.73597 14.7999 4.35013 14.4749 4.02513C14.1499 3.70012 13.764 3.44231 13.3394 3.26642C12.9148 3.09053 12.4596 3 12 3C11.0717 3 10.1815 3.36875 9.52513 4.02513C8.86875 4.6815 8.5 5.57174 8.5 6.5C8.5 7.42826 8.86875 8.3185 9.52513 8.97487C10.1815 9.63125 11.0717 10 12 10ZM3 20.4V21H21V20.4C21 18.16 21 17.04 20.564 16.184C20.1805 15.4314 19.5686 14.8195 18.816 14.436C17.96 14 16.84 14 14.6 14H9.4C7.16 14 6.04 14 5.184 14.436C4.43139 14.8195 3.81949 15.4314 3.436 16.184C3 17.04 3 18.16 3 20.4Z"
      fill="white"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaPeopleIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10C12.4596 10 12.9148 9.90947 13.3394 9.73358C13.764 9.55769 14.1499 9.29988 14.4749 8.97487C14.7999 8.64987 15.0577 8.26403 15.2336 7.83939C15.4095 7.41475 15.5 6.95963 15.5 6.5C15.5 6.04037 15.4095 5.58525 15.2336 5.16061C15.0577 4.73597 14.7999 4.35013 14.4749 4.02513C14.1499 3.70012 13.764 3.44231 13.3394 3.26642C12.9148 3.09053 12.4596 3 12 3C11.0717 3 10.1815 3.36875 9.52513 4.02513C8.86875 4.6815 8.5 5.57174 8.5 6.5C8.5 7.42826 8.86875 8.3185 9.52513 8.97487C10.1815 9.63125 11.0717 10 12 10ZM3 20.4V21H21V20.4C21 18.16 21 17.04 20.564 16.184C20.1805 15.4314 19.5686 14.8195 18.816 14.436C17.96 14 16.84 14 14.6 14H9.4C7.16 14 6.04 14 5.184 14.436C4.43139 14.8195 3.81949 15.4314 3.436 16.184C3 17.04 3 18.16 3 20.4Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaPeopleUnableIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4C8.93913 4 7.92172 4.42143 7.17157 5.17157C6.42143 5.92172 6 6.93913 6 8C6 9.06087 6.42143 10.0783 7.17157 10.8284C7.92172 11.5786 8.93913 12 10 12C11.0609 12 12.0783 11.5786 12.8284 10.8284C13.5786 10.0783 14 9.06087 14 8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4ZM17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13ZM10 14C5.58 14 2 15.79 2 18V20H11.5C11.1699 19.2078 11 18.3582 11 17.5C11.0043 16.3143 11.3328 15.1524 11.95 14.14C11.32 14.06 10.68 14 10 14ZM17.5 14.5C19.16 14.5 20.5 15.84 20.5 17.5C20.5 18.06 20.35 18.58 20.08 19L16 14.92C16.42 14.65 16.94 14.5 17.5 14.5ZM14.92 16L19 20.08C18.58 20.35 18.06 20.5 17.5 20.5C15.84 20.5 14.5 19.16 14.5 17.5C14.5 16.94 14.65 16.42 14.92 16Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaQuestionIcon.vue
```vue
<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3C9.519 3 7.5 5.019 7.5 7.5C7.5 7.79837 7.61853 8.08452 7.8295 8.2955C8.04048 8.50647 8.32663 8.625 8.625 8.625C8.92337 8.625 9.20952 8.50647 9.4205 8.2955C9.63147 8.08452 9.75 7.79837 9.75 7.5C9.75 6.261 10.761 5.25 12 5.25C13.239 5.25 14.25 6.261 14.25 7.5C14.25 8.4795 14.067 9.027 13.869 9.375C13.6635 9.738 13.3875 9.99 12.9675 10.3395L12.891 10.4025C12.501 10.725 11.973 11.163 11.571 11.811C11.121 12.5355 10.875 13.431 10.875 14.625V15.375C10.875 15.6734 10.9935 15.9595 11.2045 16.1705C11.4155 16.3815 11.7016 16.5 12 16.5C12.2984 16.5 12.5845 16.3815 12.7955 16.1705C13.0065 15.9595 13.125 15.6734 13.125 15.375V14.625C13.125 13.7565 13.299 13.293 13.4835 12.9975C13.6875 12.669 13.9575 12.4425 14.4075 12.0675C14.832 11.7135 15.3975 11.238 15.825 10.488C16.26 9.723 16.5 8.7705 16.5 7.5C16.5 5.019 14.481 3 12 3ZM12 21.375C12.3978 21.375 12.7794 21.217 13.0607 20.9357C13.342 20.6544 13.5 20.2728 13.5 19.875C13.5 19.4772 13.342 19.0956 13.0607 18.8143C12.7794 18.533 12.3978 18.375 12 18.375C11.6022 18.375 11.2206 18.533 10.9393 18.8143C10.658 19.0956 10.5 19.4772 10.5 19.875C10.5 20.2728 10.658 20.6544 10.9393 20.9357C11.2206 21.217 11.6022 21.375 12 21.375Z"
      fill="white"
    />
  </svg>
</template>
```

## File: layers/main/app/components/ha/icons/HaShieldIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_284_61)">
      <path
        d="M18.755 7.53912C18.8775 6.08226 19.3169 4.74483 20.0902 3.51844L17.1228 0.661133C16.1854 1.43803 15.1173 1.86857 13.9081 1.94437C12.7993 2.04087 11.7488 1.83816 10.7599 1.33492C9.74373 1.82142 8.69714 2.02545 7.60648 1.94437C6.49638 1.85571 5.43478 1.45144 4.5469 0.779232L1.57194 3.63566C2.30389 4.87923 2.71151 6.18053 2.79127 7.53912C2.82917 8.16443 2.64409 9.02638 2.22765 10.1391C2.03865 10.6645 1.87352 11.1983 1.73278 11.7387C1.62878 12.1833 1.564 12.5438 1.54197 12.8148C1.52699 14.0007 1.87247 15.0715 2.58107 16.0238C3.13499 16.7187 4.0485 17.4864 5.31675 18.3258C6.70398 19.0058 7.7779 19.4469 8.53012 19.6351L9.15411 19.9149C9.35021 20.0048 9.56041 20.0934 9.77942 20.1894C10.2531 20.4627 10.585 20.7583 10.7599 21.0637C10.975 20.7328 11.3147 20.445 11.766 20.1894C12.0365 20.0777 12.3048 19.9606 12.5706 19.8382L13.0417 19.6355C13.2025 19.5593 13.4128 19.4711 13.6683 19.3738C13.9846 19.2532 14.3025 19.137 14.622 19.0252C15.3548 18.7758 15.8884 18.5391 16.2273 18.3258C17.4577 17.4868 18.3571 16.7311 18.9295 16.0564C19.6632 15.101 20.0202 14.0249 20.0039 12.8157C19.9602 12.2737 19.7218 11.4073 19.2891 10.2268C18.8775 9.07617 18.6955 8.18338 18.755 7.53912Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_284_61">
        <rect
          width="22.0335"
          height="22.0335"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/HaAnchorLink.vue
```vue
<template>
  <a
    :href="`#${href}`"
    class="ha-anchor-link"
    @click.prevent="handleClick"
  >
    {{ text }}
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  href: string
}>()

const emit = defineEmits<{
  clicked: []
}>()

// ブレークポイントに応じたスクロールオフセットを取得
const getScrollOffset = () => {
  const width = window.innerWidth

  // 各値はapp/assets/styles/_variables.scssの`vket-header-height-{devices}`の値と揃える
  if (width >= 1024) return -106 // PC
  if (width >= 768) return -106 // タブレット
  return -106 // スマホ
}

const handleClick = () => {
  emit('clicked')

  setTimeout(() => {
    const target = document.querySelector(`#${props.href}`)
    if (!target) return

    const top
      = target.getBoundingClientRect().top + window.scrollY + getScrollOffset()
    window.scrollTo({ top, behavior: 'smooth' })
  }, 350)
}
</script>
```

## File: layers/main/app/components/ha/HaCommingSoonCard.vue
```vue
<template>
  <div
    class="comming-soon-card glassy-box-2"
  >
    <p class="comming-soon-card__en">
      comming soon
    </p>
    <p class="comming-soon-card__jp">
      続報をお待ちください...
    </p>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.comming-soon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 460px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    min-height: 380px;
  }

  @include m.sp {
    min-height: 340px;
  }

  &__en {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
}

&__jp {
    font-size: 14px;
    font-weight: 400;
    text-align: center;
}
}
</style>
```

## File: layers/main/app/components/ha/HaCountUpNumber.vue
```vue
<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'

// props
const props = withDefaults(
  defineProps<{
    value: number
    duration?: number
    delay?: number
  }>(),
  {
    duration: 2000,
    delay: 0,
  },
)

// 状態管理
const spanRef = shallowRef<HTMLSpanElement | null>(null)
const displayValue = ref(0)
let animationId: number | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null
let hasPlayed = false
let intersectionObserver: IntersectionObserver | null = null

// アニメーション処理
function clearTimers() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

function startCountUp(targetValue: number) {
  clearTimers()
  displayValue.value = 0

  timeoutId = setTimeout(() => {
    const startTime = performance.now()

    function tick(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / props.duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4) // 最初は速く、終盤はゆっくり目標値に近づく

      displayValue.value = Math.round(eased * targetValue)

      if (progress < 1) {
        animationId = requestAnimationFrame(tick)
      }
    }

    animationId = requestAnimationFrame(tick)
  }, props.delay)
}

// ライフサイクル
onMounted(() => {
  const el = spanRef.value
  if (!el) return

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return

      // 画面内に入り、かつまだ再生していない場合のみ発火
      if (entry.isIntersecting && !hasPlayed) {
        hasPlayed = true
        startCountUp(props.value)

        // 一度再生したら監視を解除
        intersectionObserver?.disconnect()
        intersectionObserver = null
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(el)
})

onUnmounted(() => {
  clearTimers()
  intersectionObserver?.disconnect()
})
</script>

<template>
  <span ref="spanRef">{{ displayValue }}</span>
</template>
```

## File: layers/main/app/components/ha/HaFireworks.vue
```vue
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue'

const canvasRef = shallowRef<HTMLCanvasElement | null>(null)

// アニメーション管理用の変数
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let visibilityHandler: (() => void) | null = null

// 花火の発射タイミング管理
let nextFireworkTime: number = 0

// 画面サイズに応じたスケール係数（起動時に1度だけ決定）
let scaleFactor: number = 1

// ユーティリティ
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// パーティクルの型定義
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  hue: number
}

// パーティクルをstartAnimationの外で管理（再起動時にリセットされないようにする）
let particles: Particle[] = []

// 次の花火を打ち上げる時刻をセット（1〜2秒のランダムなタイミング）
function scheduleNextFirework() {
  nextFireworkTime = performance.now() + random(1000, 2000)
}

// アニメーションのメイン処理
function startAnimation(canvas: HTMLCanvasElement) {
  // 二重起動を防ぐ
  if (animationId !== null) return

  const ctx = canvas.getContext('2d')!

  // 花火を1発生成
  function createFirework() {
    const x = random(100, canvas.width - 100)
    const y = random(100, canvas.height - 100)
    const hue = Math.floor(random(0, 360))

    // 固定パーティクル（強: 24度間隔 × 15個、中: 36度間隔 × 10個、弱: 72度間隔 × 5個 = 合計30個）を設けて概形を整える
    const fixedConfig = [
      { count: 15, interval: 24, speed: 5 * scaleFactor },
      { count: 10, interval: 36, speed: 3 * scaleFactor },
      { count: 5, interval: 72, speed: 1 * scaleFactor },
    ]

    // 花火1発ごとにランダムな回転オフセット（0〜12度）
    const rotationOffset = (random(0, 12) * Math.PI) / 180

    fixedConfig.forEach(({ count, interval, speed }) => {
      Array.from({ length: count }, (_, i) => {
        const angle = (i * interval * Math.PI) / 180 + rotationOffset
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          hue,
        })
      })
    })

    // ランダムパーティクル（30個）
    for (let i = 0; i < 30; i++) {
      const angle = random(0, Math.PI * 2)
      const speed = random(1, 5) * scaleFactor

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        hue,
      })
    }

    scheduleNextFirework()
  }

  // パーティクルの更新と描画
  function updateParticles() {
    // 画面全体をクリア（背景を透過させる）
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles = particles.filter((p) => {
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.01
      return p.alpha > 0
    })

    particles.forEach((p) => {
      ctx.beginPath()
      ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`
      ctx.arc(p.x, p.y, 2 * scaleFactor, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // アニメーションループ
  function animate() {
    animationId = requestAnimationFrame(animate)
    updateParticles()

    if (performance.now() >= nextFireworkTime) {
      createFirework()
    }
  }

  animate()
}

// アニメーション停止
function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

// canvasのサイズを親要素に合わせる
function resizeCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
}

onMounted(() => {
  const canvas = canvasRef.value as HTMLCanvasElement | null
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return

  // 起動時に1度だけ画面幅でscaleFactorを決定
  const width = window.innerWidth
  if (width < 768) {
    scaleFactor = 0.6
  } else if (width < 1024) {
    scaleFactor = 0.8
  } else {
    scaleFactor = 1.0
  }

  resizeCanvas(canvas)

  // 親要素のリサイズを監視
  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas))
  resizeObserver.observe(parent)

  // 要素の表示・非表示を監視（スクロールで画面外に出た場合）
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        startAnimation(canvas)
      } else {
        stopAnimation()
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvas)

  // タブの表示・非表示を監視
  visibilityHandler = () => {
    if (document.hidden) {
      stopAnimation()
    } else {
      startAnimation(canvas)
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)

  // 初回スケジュール（ここでのみ呼ぶ）
  scheduleNextFirework()
})

onUnmounted(() => {
  stopAnimation()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fireworks-canvas"
  />
</template>

<style scoped>
.fireworks-canvas {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}
</style>
```

## File: layers/main/app/components/ha/HaTypewriterText.vue
```vue
<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'

// props
const props = withDefaults(
  defineProps<{
    text: string
    speed?: number
    delay?: number
  }>(),
  {
    speed: 50,
    delay: 0,
  },
)

// 状態管理
const spanRef = shallowRef<HTMLSpanElement | null>(null)
const displayText = ref('')
let timeoutId: ReturnType<typeof setTimeout> | null = null
let hasPlayed = false // 一度再生したら二度と発火しないフラグ
let intersectionObserver: IntersectionObserver | null = null

// アニメーション処理
function clearTimer() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

function startTypewriter(text: string) {
  clearTimer()
  displayText.value = ''

  let index = 0

  function typeNextChar() {
    if (index >= text.length) return
    displayText.value += text[index]
    index++
    timeoutId = setTimeout(typeNextChar, props.speed)
  }

  timeoutId = setTimeout(typeNextChar, props.delay)
}

// ライフサイクル
onMounted(() => {
  const el = spanRef.value
  if (!el) return

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return

      // 画面内に入り、かつまだ再生していない場合のみ発火
      if (entry.isIntersecting && !hasPlayed) {
        hasPlayed = true
        startTypewriter(props.text)

        // 一度再生したら監視を解除
        intersectionObserver?.disconnect()
        intersectionObserver = null
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(el)
})

onUnmounted(() => {
  clearTimer()
  intersectionObserver?.disconnect()
})
</script>

<template>
  <span ref="spanRef">{{ displayText }}</span>
</template>
```

## File: layers/main/app/components/ht/HtExhibitorInfoSection.vue
```vue
<i18n lang="yaml">
ja:
  subtitle1: '出展概要'
  subtitle2: '募集スケジュール'
  overviewRow1Label: '出展費用'
  overviewRow1Value: '1スペース 3,000円'
  overviewRow2Label: '参加可能人数'
  overviewRow2Value: '1スペースにつき2名'
  overviewRow3Label: '出展内容'
  overviewRow3Value: 'グッズ・書籍頒布・作品展示など'
  description: 'また、今回のサークル募集は二回に分けて行います。{br1}二次申し込みについては一次申し込みの結果、{br2}出展枠に余裕がある場合のみ開催します。{br3}確実に出展したいという方は、ぜひ一次申し込み期間中にご応募ください。'
  primaryTitle: '一次申し込み{br}（先着順）'
  primaryRow1Label: '募集期間'
  primaryRow1Value: '6月1日(月) ～ 6月18日(木)'
  primaryRow2Label: '当落発表'
  primaryRow2Value: '6月26日(金)'
  secondaryTitle: '二次申し込み{br}（抽選）'
  secondaryRow1Label: '募集期間'
  secondaryRow1Value: '7月13日(月) ～ 7月30日(木)'
  secondaryRow2Label: '当落発表'
  secondaryRow2Value: '8月7日(金)'
en:
  subtitle1: 'Exhibition Overview'
  subtitle2: 'Application Schedule'
  overviewRow1Label: 'Booth Fee'
  overviewRow1Value: '3,000 JPY per space'
  overviewRow2Label: 'Number of Participants'
  overviewRow2Value: '2 people per space'
  overviewRow3Label: 'Exhibition Content'
  overviewRow3Value: 'Goods, books, artwork display, etc.'
  description: 'This time, circle applications will be accepted in two rounds.{br1}The second round will only be held if there are remaining spaces{br2}after the results of the first round.{br3}If you would like to secure a spot, we recommend applying during the first round.'
  primaryTitle: 'First Round{br}(First-Come, First-Served)'
  primaryRow1Label: 'Application Period'
  primaryRow1Value: 'Mon, June 1 - Thu, June 18'
  primaryRow2Label: 'Results Announcement'
  primaryRow2Value: 'Fri, June 26'
  secondaryTitle: 'Second Round{br}(Lottery)'
  secondaryRow1Label: 'Application Period'
  secondaryRow1Value: 'Mon, July 13 - Thu, July 30'
  secondaryRow2Label: 'Results Announcement'
  secondaryRow2Value: 'Fri, August 7'
</i18n>

<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.exhibitorInfo')"
      label="EXHIBITOR INFO"
    />

    <p class="subtitle">
      {{ t('subtitle1') }}
    </p>
    <div class="exhibitor-info__table mb-15">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('overviewRow1Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('overviewRow1Value') }}
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('overviewRow2Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('overviewRow2Value') }}
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('overviewRow3Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('overviewRow3Value') }}
        </p>
      </div>
    </div>

    <p class="subtitle">
      {{ t('subtitle2') }}
    </p>

    <p class="exhibitor-info__description mb-24">
      <i18n-t
        keypath="description"
        tag="span"
        scope="parent"
      >
        <template #br1>
          <br>
        </template>
        <template #br2>
          <br class="tb-only">
        </template>
        <template #br3>
          <br>
        </template>
      </i18n-t>
    </p>

    <p class="exhibitor-info__table-title">
      <i18n-t
        keypath="primaryTitle"
        tag="span"
        scope="parent"
      >
        <template #br>
          <br class="tb-only">
        </template>
      </i18n-t>
    </p>

    <div class="exhibitor-info__table mb-24">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('primaryRow1Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('primaryRow1Value') }}
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('primaryRow2Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('primaryRow2Value') }}
        </p>
      </div>
    </div>

    <p class="exhibitor-info__table-title">
      <i18n-t
        keypath="secondaryTitle"
        tag="span"
        scope="parent"
      >
        <template #br>
          <br class="tb-only">
        </template>
      </i18n-t>
    </p>

    <div class="exhibitor-info__table">
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('secondaryRow1Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('secondaryRow1Value') }}
        </p>
      </div>
      <div class="exhibitor-info__table-item">
        <p class="exhibitor-info__label">
          {{ t('secondaryRow2Label') }}
        </p>
        <p class="exhibitor-info__label">
          {{ t('secondaryRow2Value') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）

  @include m.tb {
    margin-bottom: 64px;
  }
}

.mb-15 {
  margin-bottom: 60px;

  @include m.sp {
    margin-bottom: 48px;
  }
}

.exhibitor-info {
  &__table-title {
    margin-bottom: 24px;

    font-size: 24px;
    font-weight: bold;
    line-height: 1.2em;
    color: white;
    text-align: center;

    @include m.tb {
      font-size: 22px;
    }

    @include m.sp {
      font-size: 16px;
    }
  }

  &__table-item {
    display: flex;
    justify-content: space-between;
    padding: 38px 0;
    border-bottom: 1px solid white;

    @include m.tb {
      padding: 24px 0;
    }

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    font-size: 20px;
    color: white;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 20px;
    color: white;
    text-align: right;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__description {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;

    font-size: 20px;
    line-height: 1.2em;
    color: white;

    @include m.tb {
      font-size: 16px;
      text-align: center;
    }

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/icons/HaXIcon.vue
```vue
<template>
  <svg
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_287_95)">
      <mask
        id="mask0_287_95"
        mask-type="luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="29"
        height="29"
      >
        <path
          d="M0 0H28.9863V28.9863H0V0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_287_95)">
        <path
          d="M22.8267 1.3584H27.272L17.5616 12.485L28.9863 27.6283H20.042L13.0314 18.4458L5.01877 27.6283H0.569374L10.9547 15.7232L0 1.36047H9.17209L15.4994 9.752L22.8267 1.3584ZM21.2635 24.9615H23.7274L7.8263 3.88642H5.1844L21.2635 24.9615Z"
          fill="white"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_287_95">
        <rect
          width="28.9863"
          height="28.9863"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

## File: layers/main/app/components/ha/HaConductCard.vue
```vue
<template>
  <div
    class="conduct-card glassy-box"
    :class="`conduct-card--${color}`"
  >
    <div class="conduct-card__icon-box">
      <div class="conduct-card__icon">
        <slot name="icon" />
      </div>
    </div>
    <div class="conduct-card__text-box">
      <p class="conduct-card__title">
        {{ title }}
      </p>
      <p class="conduct-card__text">
        <slot
          class="conduct-card__text"
          name="text"
        />
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  color: {
    type: String,
    validator: value =>
      ['cyan', 'magenta', 'amber', 'vermilion'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.conduct-card {
  display: flex;
  gap: 24px;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 24px 36px;

  box-shadow: inset rgb(70 132 255 / 35%) 0 0 8px 4px;

  @include m.sp {
    gap: 16px;
    padding: 16px 28px;
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    border-radius: 10px;

    @include m.sp {
      width: 32px;
      height: 32px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50%;
    height: 50%;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 13px;
    line-height: 1em;
    color: white;

    @include m.sp {
      font-size: 10px;
    }
  }

  &--magenta {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-magenta, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-magenta;
    }
  }

  &--cyan {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-cyan, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-cyan;
    }
  }

  &--amber {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-amber, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-amber;
    }
  }

  &--vermilion {
    .conduct-card__icon-box {
      background-color: rgba(v.$vket-vermilion, 0.6);
    }

    .conduct-card__title {
      color: v.$vket-vermilion;
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/HaContentCard.vue
```vue
<template>
  <a
    :href="item.href"
    target="_blank"
    rel="noopener noreferrer"
    class="content-card glassy-box-2"
  >
    <p class="content-card__title">{{ item.title }}</p>
    <p class="content-card__text">{{ item.text }}</p>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  item: { title: string, href: string, text: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.content-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 460px;
  padding: 44px 28px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    min-height: 380px;
  }

  @include m.sp {
    min-height: 340px;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 20px;
    line-height: 1.2em;
    color: v.$vket-amber;

    @include m.sp {
      margin-bottom: 12px;
      font-size: 16px;
    }
  }

  &__text {
    margin-bottom: 6px;
    color: white;
  }
}
</style>
```

## File: layers/main/app/components/ha/HaQuickAccessCard.vue
```vue
<!-- components/GlassCard.vue -->
<script setup lang="ts">
import HaArrowRight from './icons/HaArrowRightIcon.vue'

defineProps<{
  color:
    | 'cyan'
    | 'magenta'
    | 'amber'
    | 'vermilion'
    | 'light-cyan'
    | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: string
}>()
</script>

<template>
  <div
    :class="['glassy-box quick-access-card', `glassy-box--${color ?? 'cyan'}`]"
  >
    <div class="quick-access-card__head">
      <div class="quick-access-card__head-left">
        <div class="glassy-box__icon quick-access-card__icon-box">
          <slot name="icon" />
        </div>
        <div class="title-box">
          <p class="label">
            {{ label }}
          </p>
          <h3 class="title">
            {{ title }}
          </h3>
        </div>
      </div>
      <div class="quick-access-card__head-right">
        <HaArrowRight />
      </div>
    </div>
    <div class="quick-access-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.quick-access-card {
  padding: 22px 36px;

  @include m.sp {
    padding: 16px 24px;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__head-left {
    display: flex;
    gap: 12px;
  }

  &__head-right {
    height: 20px;

    svg {
      height: 100%;
    }
  }

  &__icon-box {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 54px;
    height: 54px;
    border-radius: 20px;

    @include m.tb {
      width: 38px;
      height: 38px;
      border-radius: 100px;
    }
  }

  .title-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: inherit;

    .label {
      margin-bottom: 8px;
      font-size: 10px;
      font-weight: 700;
      line-height: 1em;

      @include m.tb {
        margin-bottom: 4px;
      }
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1em;

      @include m.sp {
        font-size: 20px;
      }
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/HaSponsorCard.vue
```vue
<template>
  <div class="sponsor-card glassy-box-2">
    <div class="sponsor-card__img">
      <img
        :src="imgSrc"
        :alt="name"
      >
    </div>
    <div class="sponsor-card__text-box">
      <p class="sponsor-card__label">
        {{ label }}
      </p>
      <p class="sponsor-card__name">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imgSrc?: string
  label: string
  name: string
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.sponsor-card {
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
  padding: 24px 36px;

  @include m.sp {
    padding: 16px 24px;
  }

  &__img {
    aspect-ratio: 1/1;
    width: 100%;
    margin-bottom: 12px;
    background-color: gray;

    img {
      width: 100%;
    }
  }

  &__label {
    margin-bottom: 12px;
    font-size: 12px;
    line-height: 1em;
    color: white;
  }

  &__name {
    font-size: 24px;
    font-weight: 700;
    line-height: 1em;
    color: white;

    @include m.sp {
      font-size: 20px;
      font-weight: normal;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtHeroSection.vue
```vue
<template>
  <div
    id="gsap-fv"
    class="hero"
  >
    <div
      class="hero__bg"
      :style="{ backgroundImage: `url('/kv.png')` }"
    />
    <img
      src="/kv.png"
      alt="Vket Real in 札幌 2026 Autumnのキービジュアル"
      class="hero__kv"
    >
    <div
      id="scroll-indicator"
      class="scroll-indicator"
    >
      <span class="scroll-indicator__text">scroll</span>
      <div class="scroll-indicator__line-outer">
        <div class="scroll-indicator__line-inner" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { fadeOutOnScroll, destroyScrollTriggers } = useGsapFadeIn()
const route = useRoute()

onMounted(() => {
  initScrollEffects()
})

// ページ遷移時に#first-viewが存在しない場合があるためrouteを監視
watch(() => route.path, () => {
  destroyScrollTriggers()
  nextTick(() => initScrollEffects())
})

onUnmounted(() => {
  destroyScrollTriggers()
})

const initScrollEffects = () => {
  const firstView = document.querySelector('#gsap-fv')
  const scrollIndicator = document.querySelector('#scroll-indicator')

  if (!scrollIndicator) return

  // #first-viewがないページ（トップ以外）では実行しない
  if (!firstView) return

  fadeOutOnScroll(scrollIndicator, firstView)
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100svw;
  height: 100svh;

  clip-path: inset(0);

  &__bg {
    position: absolute;
    z-index: 1;
    inset: 0;
    transform: scale(1.2);

    overflow: hidden;

    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
    filter: blur(8px);
  }

  &__kv {
    position: relative;
    z-index: 2;

    overflow: hidden;

    width: 100%;
    height: 100%;

    object-fit: contain;
  }
}

.scroll-indicator {
  pointer-events: none;

  position: absolute;
  z-index: 2;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  transition: opacity 0.12s linear;

  &__text {
    font-size: 14px;
    color: white;
    text-shadow: 1px 1px 2px rgb(black, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  &__line-outer {
    position: relative;

    overflow: hidden;

    width: 2px;
    height: 48px;

    background: rgb(255 255 255 / 30%);
  }

  &__line-inner {
    position: absolute;
    top: -50%;
    left: 0;

    width: 100%;
    height: 50%;

    background: #fff;

    animation: line-run 1.8s cubic-bezier(0.76, 0, 0.24, 1) infinite;
  }
}

@keyframes line-run {
  0% {
    top: -50%;
  }

  100% {
    top: 100%;
  }
}
</style>
```

## File: layers/main/app/components/ha/HaAboutCard.vue
```vue
<script setup lang="ts">
defineProps<{
  color:
    | 'cyan'
    | 'magenta'
    | 'amber'
    | 'vermilion'
    | 'light-cyan'
    | 'light-magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
}>()
</script>

<template>
  <div :class="['glassy-box about-card', `glassy-box--${color ?? 'cyan'}`]">
    <h3 class="title about-card__title">
      <slot name="title" />
    </h3>
    <div class="about-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.about-card {
  padding: 20px;

  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    border-radius: 1000px;
  }

  &__title {
    font-size: 16px;
  }

  &__body {
    font-size: 13px;
    line-height: 1.2em;
  }
}
</style>
```

## File: layers/main/app/components/ha/HaConfetti.vue
```vue
<script setup lang="ts">
/*
  canvas最上部のランダムな位置から、ランダムな角度でランダムな色の長方形を一定間隔で収縮させながら落下させている。
*/
import { shallowRef, onMounted, onUnmounted } from 'vue'

const canvasRef = shallowRef<HTMLCanvasElement | null>(null)

// 調整可能なパラメータ
const CONFIG = {
  particleCount: 80,
  fallSpeed: 2,
  maxAngle: 15,
  maxRotation: 65,
  width: 12,
  height: 8,
  flipInterval: 500,
} as const

// 型定義
interface Confetti {
  x: number
  y: number
  vx: number
  vy: number
  hue: number
  scaleY: number
  scaleDirection: number
  flipTimer: number
  rotation: number
}

// 状態管理
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let visibilityHandler: (() => void) | null = null
let scaleFactor: number = 1
let confetti: Confetti[] = []

// ユーティリティ
function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// 紙吹雪を1個生成（canvas最上部からスタート）
function createConfetti(canvasWidth: number): Confetti {
  const sign = Math.random() < 0.5 ? 1 : -1
  const angleRad = ((random(0, CONFIG.maxAngle) * Math.PI) / 180) * sign
  const speed = CONFIG.fallSpeed * scaleFactor

  return {
    x: random(0, canvasWidth),
    y: -CONFIG.height,
    vx: Math.sin(angleRad) * speed,
    vy: Math.cos(angleRad) * speed,
    hue: Math.floor(random(0, 360)),
    scaleY: 1,
    scaleDirection: -1,
    flipTimer: performance.now() + CONFIG.flipInterval,
    rotation:
      (random(-1 * CONFIG.maxRotation, CONFIG.maxRotation) * Math.PI) / 180,
  }
}

// 再開時にflipTimerをばらつかせてリセット（これがないと収縮タイミングが同期してしまう）
function resetFlipTimers() {
  const now = performance.now()
  confetti.forEach((c) => {
    c.flipTimer = now + random(0, CONFIG.flipInterval * 2)
  })
}

// アニメーションのメイン処理
function startAnimation(canvas: HTMLCanvasElement) {
  if (animationId !== null) return

  const ctx = canvas.getContext('2d')!

  // 初期状態では、パーティクルを画面内のランダムな高さに配置
  if (confetti.length === 0) {
    const now = performance.now()
    confetti = Array.from({ length: CONFIG.particleCount }, () => {
      const c = createConfetti(canvas.width)
      c.y = random(0, canvas.height)
      c.flipTimer = now + random(0, CONFIG.flipInterval * 2)
      return c
    })
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const now = performance.now()
    const w = CONFIG.width * scaleFactor
    const h = CONFIG.height * scaleFactor

    confetti.forEach((c) => {
      c.x += c.vx
      c.y += c.vy

      // 回転アニメーション（収縮アニメーションによる疑似的なもの）：flipTimerごとに折り返す
      if (now >= c.flipTimer) {
        c.scaleDirection *= -1
        c.flipTimer = now + CONFIG.flipInterval
      }

      c.scaleY += c.scaleDirection * 0.05
      c.scaleY = Math.max(0.1, Math.min(1, c.scaleY))

      // 光の反射表現（回転アニメーションに合わせて輝度を変化させることによる疑似的なもの）
      const lightness = 30 + c.scaleY * 40

      // 画面下に出たら最上部に戻す
      if (c.y > canvas.height + h) {
        const next = createConfetti(canvas.width)
        Object.assign(c, next)
      }

      ctx.save()
      ctx.translate(c.x, c.y)
      ctx.rotate(c.rotation)
      ctx.scale(1, c.scaleY)
      ctx.fillStyle = `hsl(${c.hue}, 90%, ${lightness}%)`
      ctx.fillRect(-w / 2, -h / 2, w, h)
      ctx.restore()
    })
  }

  function animate() {
    animationId = requestAnimationFrame(animate)
    updateConfetti()
  }

  animate()
}

// 停止・リサイズ
function stopAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement
  if (!parent) return
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
}

// ライフサイクル
onMounted(() => {
  const canvas = canvasRef.value as HTMLCanvasElement | null
  if (!canvas) return
  const parent = canvas.parentElement
  if (!parent) return

  const width = window.innerWidth
  if (width < 768) {
    scaleFactor = 0.6
  } else if (width < 1024) {
    scaleFactor = 0.8
  } else {
    scaleFactor = 1.0
  }

  resizeCanvas(canvas)

  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas))
  resizeObserver.observe(parent)

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      if (entry.isIntersecting) {
        resetFlipTimers()
        startAnimation(canvas)
      } else {
        stopAnimation()
      }
    },
    { threshold: 0 },
  )
  intersectionObserver.observe(canvas)

  visibilityHandler = () => {
    if (document.hidden) {
      stopAnimation()
    } else {
      resetFlipTimers()
      startAnimation(canvas)
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)
})

onUnmounted(() => {
  stopAnimation()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="confetti-canvas"
  />
</template>

<style scoped>
.confetti-canvas {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  opacity: 0.2;
}
</style>
```

## File: layers/main/app/components/hm/HmCrowdLevelCard.vue
```vue
<script lang="ts" setup>
import HaAstyError from '../ha/buildings/HaAstyError.vue'
import HaAstyLevel1 from '../ha/buildings/HaAstyLevel1.vue'
import HaAstyLevel2 from '../ha/buildings/HaAstyLevel2.vue'
import HaAstyLevel3 from '../ha/buildings/HaAstyLevel3.vue'
import HaAstyLoading from '../ha/buildings/HaAstyLoading.vue'
import HaAstyUnable from '../ha/buildings/HaAstyUnable.vue'
import HaDTCError from '../ha/buildings/HaDTCError.vue'
import HaDTCLevel1 from '../ha/buildings/HaDTCLevel1.vue'
import HaDTCLevel2 from '../ha/buildings/HaDTCLevel2.vue'
import HaDTCLevel3 from '../ha/buildings/HaDTCLevel3.vue'
import HaDTCLoading from '../ha/buildings/HaDTCLoading.vue'
import HaDTCUnable from '../ha/buildings/HaDTCUnable.vue'
import HaShimmer from '../ha/HaShimmer.vue'
import HaPeopleFillIcon from '../ha/icons/HaPeopleFillIcon.vue'
import HaPeopleIcon from '../ha/icons/HaPeopleIcon.vue'
import HaPeopleUnableIcon from '../ha/icons/HaPeopleUnableIcon.vue'
import HaQuestionIcon from '../ha/icons/HaQuestionIcon.vue'

type CrowdLevel = 0 | 1 | 2 | 3 // 0: 開催期間外, 1~3: 混雑度

const props = defineProps<{
  label: string
  name: string
  isLoading: boolean
  isError: boolean
  building: 1 | 2
  crowdLevel: CrowdLevel | null
}>()

const CROWD_LEVEL_TEXT: Record<CrowdLevel, string> = {
  0: '期間外',
  1: '余裕あり',
  2: 'やや混雑',
  3: '混雑',
}

const CROWD_LEVEL_COLOR: Record<CrowdLevel, string> = {
  0: 'gray',
  1: 'emgreen',
  2: 'amber',
  3: 'vermilion',
}

const statusText = computed(() =>
  props.isLoading || props.isError
    ? '取得中'
    : props.crowdLevel !== null
      ? CROWD_LEVEL_TEXT[props.crowdLevel]
      : '取得中',
)

const statusColor = computed(() =>
  props.isLoading || props.isError
    ? 'gray'
    : props.crowdLevel !== null
      ? CROWD_LEVEL_COLOR[props.crowdLevel]
      : 'gray',
)

const fillCount = computed(() => props.crowdLevel ?? 0)
</script>

<template>
  <div
    class="glassy-box-4 crowd-level-card"
    :class="`crowd-level-card--${statusColor}`"
  >
    <div class="crowd-level-card__head">
      <div class="crowd-level-card__text-box">
        <HaShimmer
          :loading="isLoading"
          as="p"
          class="crowd-level-card__label"
        >
          {{ label }}
        </HaShimmer>
        <HaShimmer
          :loading="isLoading"
          as="p"
          class="crowd-level-card__name"
        >
          {{ name }}
        </HaShimmer>
      </div>
      <HaShimmer
        :loading="isLoading"
        as="div"
        class="crowd-level-card__status-box"
      >
        <div class="crowd-level-card__icon-box">
          <template v-if="isError">
            <HaPeopleIcon />
            <HaQuestionIcon />
          </template>
          <template v-else-if="fillCount == 0">
            <HaPeopleUnableIcon />
          </template>
          <template v-else>
            <HaPeopleFillIcon
              v-for="i in fillCount"
              :key="`fill-${i}`"
            />
            <HaPeopleIcon
              v-for="i in 3 - fillCount"
              :key="`empty-${i}`"
            />
          </template>
        </div>
        <p
          class="crowd-level-card__status-text"
          data-testid="crowd-status-text"
        >
          {{ statusText }}
        </p>
      </HaShimmer>
    </div>
    <div class="crowd-level-card__body">
      <div class="crowd-level-card__image">
        <template v-if="building == 1">
          <HaAstyLoading v-if="isLoading" />
          <HaAstyError v-else-if="isError" />
          <template v-else>
            <HaAstyUnable v-show="statusColor == 'gray'" />
            <HaAstyLevel1 v-show="statusColor == 'emgreen'" />
            <HaAstyLevel2 v-show="statusColor == 'amber'" />
            <HaAstyLevel3 v-show="statusColor == 'vermilion'" />
          </template>
        </template>
        <template v-else-if="building == 2">
          <HaDTCLoading v-if="isLoading" />
          <HaDTCError v-else-if="isError" />
          <template v-else>
            <HaDTCUnable v-show="statusColor == 'gray'" />
            <HaDTCLevel1 v-show="statusColor == 'emgreen'" />
            <HaDTCLevel2 v-show="statusColor == 'amber'" />
            <HaDTCLevel3 v-show="statusColor == 'vermilion'" />
          </template>
        </template>
      </div>
    </div>
    <div class="crowd-level-card__footer">
      <HaShimmer
        :loading="isLoading"
        as="p"
        class="crowd-level-card__text"
      >
        混雑状況
      </HaShimmer>
      <HaShimmer
        :loading="isLoading"
        as="div"
        class="crowd-level-card__carousel glassy-carousel"
      >
        <div
          class="crowd-level-card__carousel-inner glassy-carousel"
          :class="`glassy-carousel crowd-level-card__carousel-inner--${
            isError || fillCount == 0 || fillCount == 3
              ? '1-1'
              : fillCount == 1
                ? '1-4'
                : fillCount == 2
                  ? '1-2'
                  : ''
          }`"
        />
      </HaShimmer>
      <HaShimmer
        :loading="isLoading"
        as="p"
        class="crowd-level-card__text"
      >
        {{
          isError
            ? '取得中'
            : fillCount == 0
              ? '期間外'
              : fillCount == 1
                ? '低'
                : fillCount == 2
                  ? '中'
                  : fillCount == 3
                    ? '高'
                    : ''
        }}
      </HaShimmer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.crowd-level-card {
  display: flex;
  flex-direction: column;
  padding: 24px 18px 24px 32px;

  @include m.sp {
    padding: 16px;
  }

  &--emgreen {
    .crowd-level-card__status-box {
      background-color: v.$vket-emgreen;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-emgreen, 0.75);
    }
  }

  &--amber {
    .crowd-level-card__status-box {
      background-color: v.$vket-amber;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-amber, 0.75);
    }
  }

  &--gray {
    .crowd-level-card__status-box {
      background-color: v.$vket-gray;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-gray, 0.75);
    }
  }

  &--purple {
    .crowd-level-card__status-box {
      background-color: v.$vket-purple;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-purple, 0.75);
    }
  }

  &--vermilion {
    .crowd-level-card__status-box {
      background-color: v.$vket-vermilion;
    }

    .crowd-level-card__carousel-inner {
      background-color: rgba(v.$vket-vermilion, 0.75);
    }
  }

  &__head {
    display: flex;
    gap: 8px;
    justify-content: space-between;
  }

  &__text-box {
    width: fit-content;
  }

  &__label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;

    @include m.sp {
      font-size: 10px;
    }
  }

  &__name {
    font-size: 32px;
    font-weight: 900;
    line-height: 1em;

    @include m.sp {
      font-size: 18px;
    }
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    width: 24px;
    height: 24px;

    @include m.sp {
      width: 16px;
      height: 16px;
    }
  }

  &__status-box {
    display: flex;
    gap: 12px;
    align-items: center;

    width: fit-content;
    height: fit-content;
    padding: 10px 18px;
    border-radius: 20px;

    @include m.sp {
      padding: 6px 12px;
    }
  }

  &__status-text {
    font-size: 20px;
    font-weight: 600;
    line-height: 100%;
    text-wrap: nowrap;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    align-items: center;
    justify-content: flex-end;
  }

  &__image {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 50%;

    svg {
      width: 100%;
    }
  }

  &__footer {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
  }

  &__carousel {
    display: flex;
    flex-grow: 1;
    height: 14px;
  }

  &__carousel-inner {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition: width 0.6s ease;

    &--1-1 {
      width: 100%;
    }

    &--1-2 {
      width: 50%;
    }

    &--1-4 {
      width: 25%;
    }
  }

  &__text {
    width: 4em;
    font-size: 16px;
    line-height: 1em;

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtCrowdLevelsSection.vue
```vue
<script setup lang="ts">
import HaSectionTitle from '../ha/HaSectionTitle.vue'
import { useCrowdData } from '~/composables/useCrowdData'
import HmCrowdLevelCard from '../hm/HmCrowdLevelCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { isLoading, isError, crowdLevel } = useCrowdData()
const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()
onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="混雑状況"
      label="crowd-levels"
    />
    <div class="crowd-levels__grid">
      <HmCrowdLevelCard
        label="メイン会場"
        name="アスティーホール"
        :building="1"
        :is-error="isError"
        :is-loading="isLoading"
        :crowd-level="crowdLevel"
      />
      <HmCrowdLevelCard
        label="サブ会場"
        name="Deep-tech CORE SAPPORO"
        :building="2"
        :is-error="isError"
        :is-loading="isLoading"
        :crowd-level="crowdLevel"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px;
}

.crowd-levels {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;

    @include m.tb {
      grid-template-columns: 1fr;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtQandASection.vue
```vue
<i18n lang="yaml">
ja:
  items:
    item1:
      title: 'VketReal in 札幌 とはどのようなイベントですか？'
      contents:
        - 'VRSNSで活躍するクリエイターが集まるリアルイベントです。'
        - 'HIKKYが主催するVketRealから派生した有志主催イベントです。'
    item2:
      title: 'チケットはどこで買えますか？'
      contents:
        - 'オンラインにて事前販売予定しております。'
    item3:
      title: '入場制限等はありますか？'
      contents:
        - 'チケットの枚数の制限等はありません。'
    item4:
      title: '当日券はありますか？'
      contents:
        - '用意する予定です。'
en:
  items:
    item1:
      title: 'What kind of event is VketReal in Sapporo?'
      contents:
        - 'An in-person event that brings together creators active in the VR/SNS scene.'
        - 'A community-run event derived from VketReal, organized by HIKKY.'
    item2:
      title: 'Where can I purchase tickets?'
      contents:
        - 'Tickets are planned to be sold online in advance.'
    item3:
      title: 'Is there a limit on the number of attendees?'
      contents:
        - 'There is no limit on the number of tickets available.'
    item4:
      title: 'Will tickets be available at the door?'
      contents:
        - 'Yes, we plan to offer tickets at the door.'
</i18n>

<script setup lang="ts">
import HaAccordionItem from '../ha/HaAccordionItem.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t, tm, rt } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: t('items.item1.title'),
    contents: (tm('items.item1.contents') as string[]).map(c => rt(c)),
  },
  {
    id: 2,
    title: t('items.item2.title'),
    contents: (tm('items.item2.contents') as string[]).map(c => rt(c)),
  },
  {
    id: 3,
    title: t('items.item3.title'),
    contents: (tm('items.item3.contents') as string[]).map(c => rt(c)),
  },
  {
    id: 4,
    title: t('items.item4.title'),
    contents: (tm('items.item4.contents') as string[]).map(c => rt(c)),
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.qa')"
      label="Q&A"
    />
    <HaAccordionItem :items="items">
      <template #content="{ item }">
        <p
          v-for="(content, index) in item.contents"
          :key="`${item.id}-${index}`"
          class="content__text"
        >
          {{ content }}
        </p>
      </template>
    </HaAccordionItem>
  </div>
</template>
```

## File: layers/main/app/components/ha/HaContactCard.vue
```vue
<template>
  <div
    class="contact-card glassy-box-2"
    :class="`contact-card--${color}`"
  >
    <p class="contact-card__title">
      {{ title }}
    </p>
    <a
      class="jump-to-form"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <p class="jump-to-form__text">{{ text }}<br></p>
      <div class="jump-to-form__flex">
        <span class="jump-to-form__text jump-to-form__text-underline">フォームへ</span>
        <HaJumpToPageIcon class="jump-to-form__icon" />
      </div>
    </a>
  </div>
</template>

<script setup>
import HaJumpToPageIcon from './icons/HaJumpToPageIcon.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    validator: value =>
      ['cyan', 'magenta', 'amber', 'vermilion'].includes(value),
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 24px 0;

  background-color: rgb(18 33 59 / 60%);

  &__icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    border-radius: 10px;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__link {
    font-size: 14px;
    color: v.$vket-green;

    &__underline {
      text-decoration: underline;
    }
  }

  &--magenta {
    .contact-card__icon {
      background-color: rgba(v.$vket-magenta, 0.8);
    }
  }

  &--cyan {
    .contact-card__icon {
      background-color: rgba(v.$vket-cyan, 0.8);
    }
  }

  &--amber {
    .contact-card__icon {
      background-color: rgba(v.$vket-amber, 0.8);
    }
  }

  &--vermilion {
    .contact-card__icon {
      background-color: rgba(v.$vket-vermilion, 0.8);
    }
  }
}

.jump-to-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include m.sp {
    gap: 16px;
  }

  &__flex {
    display: flex;
    gap: 6px;
    align-items: center;

    width: fit-content;
    border-bottom: 1px solid v.$vket-green;
  }

  &__text {
    font-size: 14px;
    color: v.$vket-green;

    &--underline {
      margin-bottom: 0;
      font-size: 12px;
      text-decoration: underline;
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>
```

## File: layers/main/app/components/ha/HaDocumentLink.vue
```vue
<script setup lang="ts">
defineProps<{
  color: 'green' | 'cyan' | 'magenta' // @/assets/styles/_variables.scssの`card color`と命名を合わせている
  title: string
  label: 'important' | 'required' | 'Q&A'
  text: string
  href: string
}>()
</script>

<template>
  <div class="document-link">
    <div :class="['document-link__left', `document-link__left--${color}`]">
      <div class="document-link__icon">
        <slot name="icon" />
      </div>
    </div>
    <div class="document-link__right">
      <div class="document-link__row">
        <p class="document-link__title">
          {{ title }}
        </p>
        <div
          :class="[
            'document-link__label',
            `document-link__label--${
              label == 'important'
                ? 'amber'
                : label == 'required'
                  ? 'vermilion'
                  : label == 'Q&A'
                    ? 'magenta'
                    : ''
            }`,
          ]"
        >
          <p class="document-link__label-text">
            {{
              label == 'important'
                ? '重要'
                : label == 'required'
                  ? '必読'
                  : label == 'Q&A'
                    ? 'Q&A'
                    : ''
            }}
          </p>
        </div>
      </div>
      <p class="document-link__text">
        {{ text }}
      </p>
      <NuxtLink
        class="document-link__link"
        :to="href"
      >全文をチェック→</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.document-link {
  overflow: hidden;
  display: flex;

  min-height: 150px;
  border-radius: 20px;

  background: rgb(217 217 217 / 20%);

  @include m.tb {
    min-height: 105px;
  }

  &__left {
    position: relative;

    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 286px;
    height: inherit;
    border-radius: 20px 0 0 20px;

    @include m.tb {
      width: 124px;
    }

    &::before {
      content: '';

      position: absolute;
      inset: 0;

      border: 1.5px solid transparent;
      border-radius: 20px 0 0 20px;

      background-image: linear-gradient(
          135deg,
          rgb(255 255 255 / 30%) 20px,
          rgb(255 255 255 / 0%) 150px
        ),
        linear-gradient(to left, rgb(255 255 255 / 10%), rgb(255 255 255 / 10%));
      background-clip: border-box, border-box;
      background-origin: border-box, border-box;

      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0) border-box;
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }

    &--green {
      background-color: rgba(#43ffbd, 0.4);
    }

    &--cyan {
      background-color: rgba(v.$vket-cyan, 0.4);
    }

    &--magenta {
      background-color: rgba(v.$vket-magenta, 0.4);
    }
  }

  &__icon {
    width: 40px;
    height: 40px;

    @include m.sp {
      width: 24px;
      height: 24px;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 8px;
    justify-content: center;

    width: 100px;
    height: inherit;
    padding: 18px 22px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: white;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 14px;
    color: white;

    @include m.sp {
      font-size: 10px;
    }
  }

  &__link {
    font-size: 12px;
    color: #43ffbd;
    text-decoration: underline;

    @include m.sp {
      font-size: 10px;
    }
  }

  &__label {
    width: fit-content;
    padding: 3px 5px;
    border-radius: 6px;

    @include m.sp {
      border-radius: 4px;
    }

    &--amber {
      background-color: rgba(v.$vket-amber, 0.6);
    }

    &--vermilion {
      background-color: rgba(v.$vket-vermilion, 0.6);
    }

    &--magenta {
      background-color: rgba(v.$vket-magenta, 0.6);
    }
  }

  &__label-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: white;

    @include m.sp {
      font-size: 10px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/HaFirstView.vue
```vue
<template>
  <div class="fv">
    <h2 class="fv__title">
      <HaTypewriterText
        class="nowrap"
        text="バーチャルとリアルの"
        :speed="80"
        :delay="500"
      />
      <HaTypewriterText
        class="nowrap"
        text="境界を、"
        :speed="80"
        :delay="1380"
      />
      <HaTypewriterText
        class="fv__title--bold"
        text="開拓せよ。"
        :speed="80"
        :delay="1900"
      />
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.fv {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100svw;
  height: 1100px;

  @include m.sp {
    height: 100svw;
  }

  &__title {
    font-size: 64px;
    font-weight: 700;
    line-height: 1.2em;
    color: v.$vket-vermilion;
    text-align: center;

    @include m.tb {
      font-size: 36px;
    }

    @include m.sp {
      max-width: 76%;
      font-size: 24px;
    }

    span {
      display: inline-block;

      @include m.tb {
        display: block;
      }
    }

    &--bold {
      display: block;

      font-size: 128px;
      font-weight: inherit;
      line-height: 100%;
      color: white;
      text-shadow: 0 5px 20px v.$vket-amber;

      @include m.tb {
        font-size: 96px;
      }

      @include m.sp {
        font-size: 48px;
      }
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/HaSectionTitle.vue
```vue
<script setup lang="ts">
defineProps<{
  label: string
  title: string
}>()
</script>

<template>
  <div class="section-title">
    <div class="section-title__line" />
    <div class="section-title__flex">
      <div class="section-title__text-box">
        <p class="section-title__label">
          {{ label }}
        </p>
        <h2 class="section-title__text">
          {{ title }}
        </h2>
      </div>
      <div class="section-title__controls">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.section-title {
  position: relative;
  margin-bottom: 112px;
  padding-top: 16px;

  @include m.sp {
    margin-bottom: 64px;
  }

  @include m.sp {
    margin-bottom: 32px;
  }

  &__line {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 2px;
    margin-bottom: 4px;

    // 点
    &::before {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 2px;
      height: 2px;

      background: v.$vket-amber;
    }

    &::after {
      content: '';

      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 2px;
      margin-left: 12px;

      background: linear-gradient(
        to right,
        v.$vket-amber 0%,
        v.$vket-vermilion 100%
      );
    }
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: 12px;
    color: v.$vket-amber;
    letter-spacing: 0.1em;

    @include m.tb {
      font-size: 10px;
    }
  }

  &__text {
    font-size: 48px;
    font-weight: 700;
    line-height: 1em;
    color: #fff;

    @include m.tb {
      font-size: 32px;
    }

    @include m.sp {
      font-size: 24px;
    }
  }

  &__controls {
    display: flex;
    gap: 4px;
    align-items: center;
  }
}
</style>
```

## File: layers/main/app/components/ha/HaSwiperCard.vue
```vue
<template>
  <a
    :href="item.href"
    target="_blank"
    rel="noopener noreferrer"
    class="swiper-card glassy-box-2"
  >
    <img
      :src="item.imgSrc"
      :alt="item.title"
      class="swiper-card__img"
      loading="lazy"
    >
    <p class="swiper-card__timestamp">{{ item.timestamp }}</p>
    <p class="swiper-card__title">{{ item.title }}</p>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  item: { id: number, title: string, href: string, imgSrc: string, timestamp: string }
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.swiper-card {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 460px;
  padding: 24px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    min-height: 380px;
  }

  @include m.sp {
    min-height: 340px;
  }

  &__img {
    display: block;

    width: 100%;
    margin-bottom: 14px;

    object-fit: cover;

    transition: transform 0.2s ease;

    @include m.sp {
      margin-bottom: 10px;
    }

    @include m.sp {
      margin-bottom: 6px;
    }
  }

  &__timestamp {
    margin-bottom: 6px;
    color: v.$vket-amber;
  }

  &__title {
    font-size: 20px;
    line-height: 1.2em;
    color: white;

    @include m.sp {
      font-size: 16px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/HaTicketCard.vue
```vue
<i18n lang="yaml">
ja:
  cta:
    purchase: チケット購入
    pending: 準備中
en:
  cta:
    purchase: Buy Tickets
    pending: Coming soon
</i18n>

<template>
  <div class="ticket-card glassy-box-3">
    <p class="ticket-card__title">
      {{ title }}
    </p>
    <p class="ticket-card_desc">
      {{ desc }}
    </p>

    <NuxtLink
      v-if="href"
      class="glassy-button ticket-card__button none-hover-animation"
      :to="href"
      target="_blank"
      rel="noopener"
    >
      {{ ctaLabel ?? t('cta.purchase') }}
    </NuxtLink>
    <span
      v-else
      class="glassy-button ticket-card__button ticket-card__button--disabled none-hover-animation"
    >
      {{ ctaLabel ?? t('cta.pending') }}
    </span>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  title: string
  desc: string
  href?: string
  ctaLabel?: string
}>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ticket-card {
  display: flex;
  flex-direction: column;
  gap: 44px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgb(49 35 96 / 40%);
  mix-blend-mode: plus-lighter;

  @include m.tb {
    gap: 16px;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1em;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__desc {
    font-size: 16px;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 130px;
    height: 40px;

    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: none;

    &--disabled {
      cursor: not-allowed;
      opacity: 0.68;
    }
  }
}
</style>
```

## File: layers/main/app/components/ha/HaInfoCard.vue
```vue
<script setup lang="ts">
import HaInfoIcon from './icons/HaInfoIcon.vue'

const { t } = useI18n()

const brSlots = ['br', 'br1', 'br2', 'br3']

interface InfoItem {
  labelKey: string
  textKey: string
  brClass?: string
}

defineProps<{
  titleKey: string
  items: InfoItem[]
}>()
</script>

<template>
  <div class="info-card glassy-box-2 none-hover-animation">
    <div class="info-card__head">
      <div class="info-card__icon">
        <HaInfoIcon />
      </div>
      <h4 class="info-card__title">
        {{ t(titleKey) }}
      </h4>
    </div>
    <div class="info-card__body">
      <div class="info-card__items">
        <div
          v-for="item in items"
          :key="item.labelKey"
          class="info-card__item"
        >
          <p class="info-card__label">
            {{ t(item.labelKey) }}
          </p>
          <p class="info-card__text">
            <i18n-t
              :keypath="item.textKey"
              tag="span"
              scope="global"
            >
              <template
                v-for="slot in brSlots"
                #[slot]=""
                :key="slot"
              >
                <br :class="item.brClass">
              </template>
            </i18n-t>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.info-card {
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;
  height: 100%;
  min-height: 340px;
  padding: 32px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    padding: 24px;
  }

  &__head {
    display: flex;
    gap: 24px;
    align-items: center;

    @include m.sp {
      gap: 8px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    border-radius: 5px;

    background: rgb(30 53 91 / 100%);

    @include m.sp {
      width: 28px;
      height: 28px;
    }

    svg {
      width: 60%;
      height: 60%;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__body {
    flex-grow: 1;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgb(86 86 86 / 100%);

    &:last-of-type {
      border: none;
    }
  }

  &__label {
    padding-right: 16px;

    font-size: 16px;
    font-weight: bold;
    color: v.$vket-amber;
    white-space: nowrap;

    @include m.sp {
      font-size: 14px;
    }
  }

  &__text {
    font-size: 16px;
    color: white;
    text-align: right;

    @include m.sp {
      font-size: 14px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtAccessSection.vue
```vue
<script setup lang="ts">
import HaInfoCard from '../ha/HaInfoCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const accessInfoItems = [
  {
    labelKey: 'infoCard.venue.items.venueName.label',
    textKey: 'infoCard.venue.items.venueName.text',
  },
  {
    labelKey: 'infoCard.venue.items.address.label',
    textKey: 'infoCard.venue.items.address.text',
    brClass: 'tb-only',
  },
  {
    labelKey: 'infoCard.venue.items.access.label',
    textKey: 'infoCard.venue.items.access.text',
  },
]

const { t: tGlobal } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.locationInfo')"
      label="LOCATION INFO"
    />
    <div class="access-flex">
      <div class="access-flex__left map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.8284432733867!2d141.3482173!3d43.0660756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b299fc2c5a775%3A0xe3754b24ac5c10e4!2z44Ki44K544OG44KjNDU!5e0!3m2!1sja!2sjp!4v1780036570202!5m2!1sja!2sjp"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <HaInfoCard
        class="access-flex__right"
        title-key="infoCard.venue.title"
        :items="accessInfoItems"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.access-flex {
  display: flex;
  gap: 40px;

  @include m.tb {
    flex-direction: column;
  }

  @include m.sp {
    gap: 22px;
  }

  &__left,
  &__right {
    width: 100%;
  }
}

.map-container {
  position: relative;
  background-color: #ffffff70;

  @include m.tb {
    min-height: 480px;
  }

  @include m.sp {
    min-height: 240px;
  }

  iframe {
    position: absolute;
    inset: 0;

    width: auto;
    width: 100%;
    height: auto;
    height: 100%;
    border: none;
  }
}

.mb-30 {
  margin-bottom: 120px;
}
</style>
```

## File: layers/main/app/components/ht/HtCodeOfConductSection.vue
```vue
<script setup lang="ts">
import HaConductCard from '../ha/HaConductCard.vue'
import HaCamera from '../ha/icons/HaCameraIcon.vue'
import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'
import HaHeartIcon from '../ha/icons/HaHeartIcon.vue'
import HaShieldIcon from '../ha/icons/HaShieldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.conduct-grid__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="行動規範"
      label="CODE OF CONDUCT"
    />
    <p class="description description--left">
      すべての参加者が安全で楽しい時間を過ごせるよう、<br>
      以下の行動規範を守ってください。
    </p>
    <div
      ref="listRef"
      class="conduct-grid mb-15"
    >
      <div class="conduct-grid__child">
        <HaConductCard
          title="互いを尊重しましょう"
          color="magenta"
        >
          <template #icon>
            <HaHeartIcon />
          </template>
          <template #text>
            すべての参加者の多様性を尊重し、<br>ハラスメントや差別的な行為は禁止です。
          </template>
        </HaConductCard>
      </div>
      <div class="conduct-grid__child">
        <HaConductCard
          title="撮影マナーを守りましょう"
          text="descriptiondescriptiondescription"
          color="cyan"
        >
          <template #icon>
            <HaCamera />
          </template>
          <template #text>
            他の参加者を撮影する際は必ず許可を取り、<br>撮影禁止エリアでは撮影をお控えください。
          </template>
        </HaConductCard>
      </div>
      <div class="conduct-grid__child">
        <HaConductCard
          title="安全に配慮しましょう"
          text="descriptiondescriptiondescription"
          color="amber"
        >
          <template #icon>
            <HaDangerIcon />
          </template>
          <template #text>
            会場内では走らない、通路をふさがないなど、<br>安全な行動を心掛けてください。
          </template>
        </HaConductCard>
      </div>
      <div class="conduct-grid__child">
        <HaConductCard
          title="スタッフの指示に従いましょう"
          text="descriptiondescriptiondescription"
          color="vermilion"
        >
          <template #icon>
            <HaShieldIcon />
          </template>
          <template #text>
            スタッフの指示に従い、<br>問題があれば速やかにスタッフにお知らせください。
          </template>
        </HaConductCard>
      </div>
    </div>
    <button class="glassy-button conduct__button">
      詳細を確認
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.mb-15 {
  margin-bottom: 60px;

  @include m.sp {
    margin-bottom: 48px;
  }
}

.conduct-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    grid-template-columns: 1fr;
    width: 60%;
  }

  @include m.sp {
    width: 100%;
  }
}

.conduct {
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 185px;
    height: 57px;
    margin: 0 auto;

    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;

    background-color: #e5b5ff3b;

    @include m.tb {
      width: 130px;
      height: 40px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtScheduleSection.vue
```vue
<script setup lang="ts">
import HaCommingSoon from '../ha/HaCommingSoon.vue'
// import HaSunIcon from '../ha/icons/HaSunIcon.vue'
// import HaSunsetIcon from '../ha/icons/HaSunsetIcon.vue'

const { t: tGlobal } = useI18n()

// // GSAP
// import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

// const sectionRef = ref<HTMLElement | null>(null)
// const { fadeInUp } = useGsapFadeIn()

// onMounted(() => {
//   fadeInUp(sectionRef)
// })
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.schedule')"
    label="SCHEDULE"
  />
  <HaCommingSoon />
  <!-- <div ref="sectionRef">
    <HaSectionTitle
      title="開催スケジュール"
      label="SCHEDULE"
    />

    <div class="schedule">
      <div class="schedule__left">
        <div class="schedule__icon-box">
          <HaSunIcon />
        </div>
        <span class="schedule__line" />
        <div class="schedule__icon-box">
          <HaSunsetIcon />
        </div>
      </div>
      <div class="schedule__right">
        <div class="schedule__item">
          <p class="schedule__time">
            10:00
          </p>
          <p class="schedule__content">
            会場・受付開始
          </p>
        </div>
        <div class="schedule__item">
          <p class="schedule__time">
            10:30
          </p>
          <p class="schedule__content">
            オープニングセレモニー
          </p>
        </div>
        <div class="schedule__item">
          <p class="schedule__time">
            11:00
          </p>
          <p class="schedule__content">
            展示・即売会開始
          </p>
        </div>
        <div class="schedule__item schedule__item--1h">
          <p class="schedule__time">
            12:00
          </p>
          <p class="schedule__content">
            XR体験ブースオープン
          </p>
        </div>
        <div class="schedule__item schedule__item--1h">
          <p class="schedule__time">
            13:00
          </p>
          <p class="schedule__content">
            スペシャルトークセッション
          </p>
        </div>
        <div class="schedule__item schedule__item--15h">
          <p class="schedule__time">
            14:30
          </p>
          <p class="schedule__content">
            スペシャルトークセッション
          </p>
        </div>
        <div class="schedule__item schedule__item--2h">
          <p class="schedule__time">
            16:00
          </p>
          <p class="schedule__content">
            スペシャルライブ
          </p>
        </div>
        <div class="schedule__item schedule__item--1h">
          <p class="schedule__time">
            18:00
          </p>
          <p class="schedule__content">
            閉場
          </p>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.schedule {
  display: flex;

  &__left {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;

    width: 80px;

    @include m.tb {
      width: 104px;
    }

    @include m.sp {
      width: 84px;
    }
  }

  &__icon-box {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 80px;

    @include m.sp {
      width: 74px;
      height: 74px;
    }
  }

  &__icon {
    width: 100%;
    height: 100%;
  }

  &__line {
    flex-grow: 1;
    width: 1px;
    height: 100px;
    background-color: white;
  }

  &__right {
    flex-grow: 1;
    padding: 100px 0;

    @include m.sp {
      padding: 38px 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100px;
    border-top: 2px solid white;

    @include m.sp {
      height: 44px;
      border-width: 1px;
    }

    &:last-of-type {
      border-bottom: 2px solid white;

      @include m.sp {
        border-width: 1px;
      }
    }

    &--1h {
      height: 150px;

      @include m.sp {
        height: 62px;
      }
    }

    &--15h {
      height: 200px;

      @include m.sp {
        height: 74px;
      }
    }
  }

  &__time {
    font-size: 16px;
    font-weight: 700;
    color: white;

    @include m.sp {
      font-size: 10px;
    }
  }

  &__content {
    font-size: 20px;
    font-weight: 700;
    color: white;

    @include m.sp {
      font-size: 12px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtSponsorsAndPartnersSection.vue
```vue
<script setup lang="ts">
import HaCommingSoon from '../ha/HaCommingSoon.vue'
import HaSectionTitle from '../ha/HaSectionTitle.vue'

// import HaSponsorCard from '../ha/HaSponsorCard.vue'

const { t: tGlobal } = useI18n()

// // GSAP
// import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

// const sectionRef = ref<HTMLElement | null>(null)
// const listRef = ref<HTMLElement | null>(null)
// const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

// onMounted(() => {
//   fadeInUp(sectionRef)
//   if (!listRef.value) return
//   const items = listRef.value.querySelectorAll('.sponsor-grid__child')
//   fadeInUpStagger(Array.from(items))
// })
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.sponsorsAndPartners')"
    label="SPONSORS & PARTNERS"
  />
  <HaCommingSoon />
  <!-- <div ref="sectionRef">
    <HaSectionTitle
      title="ご協力"
      label="SPONSORS & PARTNERS"
    />
    <div
      ref="listRef"
      class="sponsor-grid"
    >
      <div class="sponsor-grid__child">
        <HaSponsorCard
          label="企業出展"
          name="〇〇〇 様"
        />
      </div>
      <div class="sponsor-grid__child">
        <HaSponsorCard
          label="企業出展"
          name="〇〇〇 様"
        />
      </div>
      <div class="sponsor-grid__child">
        <HaSponsorCard
          label="企業出展"
          name="〇〇〇 様"
        />
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.sponsor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  @include m.tb {
    grid-template-columns: 1fr 1fr;
  }

  @include m.sp {
    gap: 20px;
  }
}
</style>
```

## File: layers/main/app/components/ht/HtTicketSection.vue
```vue
<i18n lang="yaml">
ja:
  section:
    title: チケット
    label: tickets
  description:
    line1: 持続可能なイベント開催のため、
    line2: チケット制でのご参加にご協力をお願いいたします。
    line3: チケットは複数種類を用意予定です。
  cards:
    general:
      title: 一般参加チケット
      desc: 販売開始に向けて準備中です。
      cta: 準備中
    exhibitor:
      title: 出展者向け案内
      desc: 募集要項・申込方法は順次公開予定です。
      cta: 近日公開
    updates:
      title: 最新情報
      desc: 公式Xで販売開始や追加情報をお知らせします。
      cta: 公式Xを見る
en:
  section:
    title: Tickets
    label: tickets
  description:
    line1: To support a sustainable event,
    line2: we kindly ask for your cooperation with ticketed admission.
    line3: Multiple ticket types are planned.
  cards:
    general:
      title: General Admission
      desc: Ticket sales are being prepared.
      cta: Coming soon
    exhibitor:
      title: Exhibitor Information
      desc: Application guidelines and details will be announced later.
      cta: Coming soon
    updates:
      title: Latest Updates
      desc: Sales launches and additional information will be announced on official X.
      cta: Official X
</i18n>

<script setup lang="ts">
import HaTicketCard from '../ha/HaTicketCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()
const sectionRef = ref<Element | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.ticket-grid__item')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="t('section.title')"
      :label="t('section.label')"
    />
    <p class="description description--left">
      {{ t('description.line1') }}<br>
      {{ t('description.line2') }}<br>
      {{ t('description.line3') }}
    </p>
    <div
      ref="listRef"
      class="ticket-grid"
    >
      <div class="ticket-grid__item">
        <HaTicketCard
          :title="t('cards.general.title')"
          :desc="t('cards.general.desc')"
          :cta-label="t('cards.general.cta')"
        />
      </div>
      <div class="ticket-grid__item">
        <HaTicketCard
          :title="t('cards.exhibitor.title')"
          :desc="t('cards.exhibitor.desc')"
          :cta-label="t('cards.exhibitor.cta')"
        />
      </div>
      <div class="ticket-grid__item ticket-grid__item--full-width">
        <HaTicketCard
          :title="t('cards.updates.title')"
          :desc="t('cards.updates.desc')"
          href="https://x.com/vketreal_vris"
          :cta-label="t('cards.updates.cta')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ticket-grid {
  display: grid;
  grid-auto-rows: 275px;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  @include m.tb {
    grid-auto-rows: 166px;
    gap: 12px 16px;
  }

  @include m.sp {
    grid-template-columns: 1fr;
  }

  &__item {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtRelatedEventsSection.vue
```vue
<script setup lang="ts">
import HmNewsSwiper from '../hm/HmNewsSwiper.vue'
import HaChevronLeftIcon from '../ha/icons/HaChevronLeftIcon.vue'
import HaChevronRightIcon from '../ha/icons/HaChevronRightIcon.vue'

// Swiper
import type { Swiper as SwiperType } from 'swiper'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)
const isBeginning = ref(true)
const isEnd = ref(false)
const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()
onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="関連イベント"
      label="RELATED EVENTS"
    >
      <template #controls>
        <button
          :disabled="isBeginning"
          class="custom-swiper-button"
          :class="{ 'is-disabled': isBeginning }"
          @click="worksSwiperRef?.swiperInstance?.slidePrev()"
        >
          <HaChevronLeftIcon />
        </button>
        <button
          :disabled="isEnd"
          class="custom-swiper-button"
          :class="{ 'is-disabled': isEnd }"
          @click="worksSwiperRef?.swiperInstance?.slideNext()"
        >
          <HaChevronRightIcon />
        </button>
      </template>
    </HaSectionTitle>
    <HmNewsSwiper
      :_slides-per-view="1"
      :_breakpoints="{
        768: { slidesPerView: 1.4 },
      }"
      @slide-change="onSlideChange"
    />
  </div>
</template>
```

## File: layers/main/app/components/ha/HaAccordionItem.vue
```vue
<script setup lang="ts">
import { ref } from 'vue'
import HaChevronDownIcon from './icons/HaChevronDownIcon.vue'

interface AccordionItem {
  id: number
  title: string
  contents: Array<string>
}

defineProps<{
  items: AccordionItem[]
}>()

const openId = ref<number | null>(null)

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="accordion glassy-box accordion-glassy-box none-hover-animation">
    <button
      v-for="item in items"
      :key="item.id"
      class="accordion-item glassy-box accordion-glassy-box none-hover-animation"
      :class="{ 'accordion-item--is-open': openId === item.id }"
      @click="toggle(item.id)"
    >
      <div class="accordion-item__header">
        <div class="accordion-item__left">
          <p class="accordion-item__label">
            Q{{ item.id }}
          </p>
          <p class="accordion-item__title">
            {{ item.title }}
          </p>
        </div>
        <div class="accordion-item__icon">
          <HaChevronDownIcon />
        </div>
      </div>

      <div class="accordion-item__body">
        <div class="accordion-item__inner">
          <slot
            name="content"
            :item="item"
          />
        </div>
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  max-width: 760px;
  height: fit-content;
  margin: 0 auto;
  padding: 70px 36px;

  background-color: rgb(18 33 59 / 60%);

  @include m.tb {
    padding: 48px 24px;
    border-radius: 20px;
  }

  @include m.sp {
    padding: 32px 16px;
  }
}

.accordion-item {
  width: 100%;
  padding: 40px;

  background-color: rgb(42 63 99 / 0%);
  mix-blend-mode: plus-lighter;

  transition: background-color 1s ease;

  @include m.sp {
    padding: 16px;
  }

  &__header {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  &__label {
    font-size: 20px;
    font-weight: 700;
    color: #258966;
    white-space: nowrap;

    @include m.sp {
      font-size: 16px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: white;
    text-align: left;

    @include m.sp {
      font-size: 12px;
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    transition: transform 0.3s ease;

    @include m.sp {
      width: 20px;
      height: 20px;
    }
  }

  &__body {
    display: grid;
    grid-template-rows: 0fr;
    padding-top: 0;
    transition: padding 0.3s ease, grid-template-rows 0.3s ease;
  }

  &__inner {
    overflow: hidden;

    padding-left: 44px;

    font-size: 16px;
    font-weight: 700;
    color: white;
    text-align: left;

    @include m.sp {
      font-size: 12px;
      font-weight: normal;
    }
  }

  &--is-open {
    background-color: rgb(42 63 99 / 80%);

    .accordion-item__icon {
      transform: rotate(180deg);
    }

    .accordion-item__body {
      grid-template-rows: 1fr;
      padding-top: 80px;

      @include m.sp {
        padding-top: 32px;
      }
    }
  }
}

.accordion-glassy-box {
  box-shadow: inset rgb(70 132 255 / 35%) 0 0 8px 4px;
}
</style>
```

## File: layers/main/app/components/ho/HoTheFooter.vue
```vue
<script setup lang="ts">
import HaXIcon from '../ha/icons/HaXIcon.vue'

const { t } = useI18n()
</script>

<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
en:
  mainlogo: VketReal in Sapporo 2026 Autumn
</i18n>

<template>
  <footer class="footer">
    <div class="footer__upper">
      <div class="footer__left">
        <a
          href="/"
          class="footer__logo-link"
        >
          <img
            class="footer__logo"
            src="/vketreal_in_sapporo_logo_light.png"
            :alt="t('mainlogo')"
          >
        </a>
        <!-- <nav class="footer__nav">
          <NuxtLink
            class="footer__link"
            to="/documents/terms"
          >利用規約</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/privacy-policy"
          >プライバシー</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/code-of-conduct"
          >行動規範</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/exhibition-guidline"
          >出展ガイドライン</NuxtLink>
          <NuxtLink
            class="footer__link"
            to="/documents/exhibition-terms"
          >出展規約</NuxtLink>
        </nav> -->
      </div>
      <a
        href="https://x.com/vketreal_vris"
        target="blank"
        rel="noopener noreferrer"
        class="footer__x-logo"
      >
        <HaXIcon />
      </a>
    </div>
    <div class="footer__divider" />
    <div class="footer__lower">
      <p class="footer__copy">
        🄫 2026 VketReal in 札幌 実行委員会. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as m;

.footer {
  position: relative;
  z-index: 1;

  padding: 88px 105px 0;
  border-radius: 40px 40px 0 0;

  background-color: rgb(25 25 25 / 100%);

  @include m.sp {
    padding: 52px 32px 0;
  }

  &__upper {
    display: flex;
    justify-content: space-between;
  }

  &__logo-link {
    display: block;
    height: 92px;
    margin-bottom: 64px;

    @include m.tb {
      height: 72px;
      margin-bottom: 40px;
    }

    @include m.sp {
      height: 46px;
    }
  }

  &__logo {
    height: 100%;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding-bottom: 48px;
  }

  &__link {
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;
    text-decoration: underline;

    @include m.tb {
      font-size: 12px;
      text-decoration: none;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    background-color: #8f8f8f;
  }

  &__x-logo {
    width: 30px;

    @include m.sp {
      width: 16px;
    }
  }

  &__lower {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 78px;
  }

  &__copy {
    font-family: Inter, sans-serif;
    font-size: 12px;
    color: white;

    @include m.sp {
      font-size: 8px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ho/HoTheHeader.vue
```vue
<i18n lang="yaml">
ja:
  mainlogo: VketReal in 札幌 2026 Autumn
en:
  mainlogo: VketReal in Sapporo 2026 Autumn
</i18n>

<template>
  <div
    id="gsap-header"
    class="header__wrapper"
  >
    <header class="ho-the-header">
      <div class="ho-the-header__left glassy-box-4 glassy-box-4--radius-full none-hover-animation">
        <a
          href="/"
          class="ho-the-header__logo-link"
        >
          <img
            class="ho-the-header__logo"
            src="/vketreal_in_sapporo_logo_light.png"
            :alt="t('mainlogo')"
          >
        </a>
      </div>

      <div class="ho-the-header__accordion-wrapper--inner">
        <div class="ho-the-header__accordion-wrapper">
          <div
            class="ho-the-header__right glassy-box-4 none-hover-animation ho-the-header__accordion"
            :class="{ 'is-open': isPanelOpen }"
          >
            <div class="ho-the-header__accordion-body">
              <nav class="ho-the-header__accordion-nav">
                <ul class="ho-the-header__accordion-ul">
                  <li
                    v-for="link in navLinks"
                    :key="link.href"
                    class="ho-the-header__accordion-li"
                  >
                    <a
                      v-if="link.type === 'link'"
                      :href="link.href"
                      class="ho-the-header__accordion-link"
                      @click="isPanelOpen = false"
                    >{{ link.text }}</a>
                    <HaAnchorLink
                      v-else
                      class="ho-the-header__accordion-link"
                      :href="link.href"
                      :text="link.text"
                      @clicked="isPanelOpen = false"
                    />
                  </li>
                </ul>
              </nav>
            </div>
            <div class="ho-the-header__hamburger-wrapper">
              <button
                class="ho-the-header__hamburger"
                :aria-label="isPanelOpen ? 'メニューを閉じる' : 'メニューを開く'"
                :aria-expanded="isPanelOpen"
                @click="isPanelOpen = !isPanelOpen"
              >
                <HaHamburgerIcon
                  v-show="!isPanelOpen"
                  class="ho-the-header__hamburger-icon"
                  :class="{ 'is-open': isPanelOpen }"
                />
                <HaCloseIcon
                  v-show="isPanelOpen"
                  class="ho-the-header__hamburger-icon"
                  :class="{ 'is-open': isPanelOpen }"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ho-the-header__right ho-the-header__right--pc-only glassy-box-4 glassy-box-4--radius-full none-hover-animation">
        <nav class="ho-the-header__nav">
          <ul class="ho-the-header__ul">
            <li
              v-for="link in navLinks"
              :key="link.href"
              class="ho-the-header__li"
            >
              <a
                v-if="link.type === 'link'"
                :href="link.href"
                class="ho-the-header__link"
              >{{ link.text }}</a>
              <HaAnchorLink
                v-else
                class="ho-the-header__link"
                :href="link.href"
                :text="link.text"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HaHamburgerIcon from '../ha/icons/HaHamburgerIcon.vue'
import HaAnchorLink from '../ha/HaAnchorLink.vue'
import HaCloseIcon from '../ha/icons/HaCloseIcon.vue'

const { t } = useI18n()

export type NavLink
  = | { type: 'link', href: string, text: string }
    | { type: 'anchor', href: string, text: string }

defineProps<{
  navLinks: NavLink[]
}>()

const isPanelOpen = ref(false)

watch(isPanelOpen, (val) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflowX = val ? 'hidden' : ''
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.header__wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  width: 100%;
  height: v.$vket-header-height-pc;
  padding: 40px 16px;

  @include m.tb {
    height: v.$vket-header-height-tb;
    padding: 28px 16px;
  }

  @include m.sp {
    height: v.$vket-header-height-sp;
  }
}

.ho-the-header {
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  box-sizing: border-box;
  width: 100%;
  max-width: calc(1600px - 136px * 2); // FIXME: 1600px(メインコンテンツのmax-width) - 136*2(メインコンテンツのpadding-x)をハードコーディングしてしまっている
  height: 100%;
  margin: 0 auto;

  &__left {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    height: 100%;
    padding-right: 32px;
    padding-left: 32px;

    @include m.tb {
      padding-right: 24px;
    padding-left: 24px;
    }
  }

  &__right {
    display: flex;
    align-items: center;

    height: 100%;
    padding-right: 40px;
    padding-left: 40px;

    @include m.tb {
      padding-right: 24px;
      padding-left: 24px;
    }

    &--pc-only {
      @include m.sp {
        display: none;
      }
    }

    &--pc-none {
      display: none;

      @include m.sp {
        display: flex;
      }
    }
  }

  &__logo {
    height: 50px;

    @include m.tb {
      height: 36px;
    }
  }

  // PC用ナビ
  &__nav {
    @include m.tb {
      display: none;
    }
  }

  &__ul {
    display: flex;
    gap: 24px;
    align-items: center;
    list-style: none;
  }

  &__link {
    font-weight: 700;
    color: white;
    text-decoration: none;
  }

  &__accordion-wrapper {
    position: relative;
  }

  &__accordion-wrapper--inner {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__accordion {
    display: none;
    align-items: start;

    width: fit-content;
    height: fit-content;
    min-height: 50px;
    padding: 0;
    border-radius: 25px;

    @include m.tb {
      display: flex;
    }

    &-body {
      display: grid;
      grid-template-columns: 0fr;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease, grid-template-columns 0.3s ease;

      > nav {
        overflow: hidden;
      }
    }

    &.is-open &-body {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }

    &-ul {
      display: flex;
      flex-direction: column;

      margin: 0;
      padding: 36px 0 14px;

      list-style: none;
    }

    &-link {
      display: block;

      padding: 12px 24px;

      font-size: 15px;
      color: white;
      text-decoration: none;
      white-space: nowrap;
    }
  }

  &__hamburger-wrapper {
    padding: 7px;
  }

  // ハンバーガーボタン
  &__hamburger {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;

    &-icon {
      display: block;
      width: 22px;
      height: 22px;
      color: white;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtContactSection.vue
```vue
<i18n lang="yaml">
ja:
  personal:
    title: '個人向けお問い合わせ'
    text: '一般の方からのお問い合わせはこちら'
  corporate:
    title: '法人向けお問い合わせ'
    text: '企業・法人の方からのお問い合わせはこちら'
  press:
    title: '広報向けお問い合わせ'
    text: 'メディア・広報関連のお問い合わせはこちら'
en:
  personal:
    title: 'For General Inquiries'
    text: 'For inquiries from individuals'
  corporate:
    title: 'For Business Inquiries'
    text: 'For inquiries from companies and organizations'
  press:
    title: 'For Press Inquiries'
    text: 'For media and press-related inquiries'
</i18n>

<script setup lang="ts">
import HaContactCard from '../ha/HaContactCard.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'
// import HaDangerIcon from '../ha/icons/HaDangerIcon.vue'

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.contact-grid__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.contact')"
      label="CONTACT"
    />
    <div class="contact-grid">
      <HaContactCard
        :title="t('personal.title')"
        :text="t('personal.text')"
        href="https://docs.google.com/forms/d/e/1FAIpQLSchGlf0h1eszxPupo5aWycU_s3CAOmkP1LJP38Niiwi95KNwQ/viewform"
        color="amber"
        class="contact-grid__child"
      />
      <HaContactCard
        :title="t('corporate.title')"
        :text="t('corporate.text')"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeEevGm1q7byQWd7RhGWTGYClcGthQEbWufSviyiFbcYzsd6A/viewform"
        color="cyan"
        class="contact-grid__child"
      />
      <HaContactCard
        :title="t('press.title')"
        :text="t('press.text')"
        href="https://docs.google.com/forms/d/e/1FAIpQLScmYNjxOyf1GtHVSqsRe7pFDoyfUhiSSDqJh5Q0WD40b-1LOg/viewform"
        color="magenta"
        class="contact-grid__child contact-grid__child--full-width"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;

  max-width: 760px;
  margin: 0 auto;

  @include m.sp {
    grid-template-columns: 1fr;
  }

  &__child {
    &--full-width {
      grid-column: 1 / -1;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtContentsSection.vue
```vue
<script setup lang="ts">
import HmContentsSwiper from '../hm/HmContentsSwiper.vue'
import HaChevronLeftIcon from '../ha/icons/HaChevronLeftIcon.vue'
import HaChevronRightIcon from '../ha/icons/HaChevronRightIcon.vue'

// Swiper
import type { Swiper as SwiperType } from 'swiper'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: t('contents.1.title'),
    href: 'https://archived.vris.jp/',
    text: t('contents.1.text'),
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.contents')"
    label="CONTENTS"
  >
    <template #controls>
      <button
        :disabled="isBeginning"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isBeginning }"
        @click="worksSwiperRef?.swiperInstance?.slidePrev()"
      >
        <HaChevronLeftIcon />
      </button>
      <button
        :disabled="isEnd"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isEnd }"
        @click="worksSwiperRef?.swiperInstance?.slideNext()"
      >
        <HaChevronRightIcon />
      </button>
    </template>
  </HaSectionTitle>
  <div ref="sectionRef">
    <HmContentsSwiper
      ref="worksSwiperRef"
      class="contents__swiper"
      :items="items"
      :_slides-per-view="1"
      :_breakpoints="{
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      }"
      @slide-change="onSlideChange"
    />
    <NuxtLink
      class="glassy-button contents__button"
      to="/contents"
    >
      {{ tGlobal("viewAll") }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.contents {
  &__swiper {
    margin-bottom: 36px;

    @include m.tb {
      margin-bottom: 24px;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 218px;
    height: 74px;
    margin: 0 auto;

    font-family: Inter, sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: white;

    background-color: #e5b5ff3b;

    @include m.tb {
      width: 198px;
      height: 64px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtExhibitionSection.vue
```vue
<script setup lang="ts">
import HaAboutCard from '../ha/HaAboutCard.vue'
import HaDocumentLink from '../ha/HaDocumentLink.vue'
import HaBalanceIcon from '../ha/icons/HaBalanceIcon.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaOpenBookIcon from '../ha/icons/HaOpenBookIcon.vue'
import HaCircledQuestionIcon from '../ha/icons/HaCircledQuestionIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const list2Ref = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value || !list2Ref.value) return
  const items = listRef.value.querySelectorAll('.card-flex__child')
  const items2 = list2Ref.value.querySelectorAll('.link-list__child')
  fadeInUpStagger(Array.from(items))
  fadeInUpStagger(Array.from(items2))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      title="出展情報"
      label="exhibition"
    />
    <p class="subtitle">
      出展カテゴリ
    </p>
    <div
      ref="listRef"
      class="card-flex mb-24"
    >
      <div class="card-flex__child">
        <HaAboutCard color="amber">
          <template #icon>
            <HaStarShineIcon />
          </template>
          <template #title>
            サークル出展
          </template>
          <template #body>
            VRクリエイターによるアイテムやグッズの展示・販売ブースです。3Dプリント作品、イラスト、同人誌など幅広いジャンルで出店できます。
          </template>
        </HaAboutCard>
      </div>
      <div class="card-flex__child">
        <HaAboutCard
          icon-url="/icons/tabler_world.svg"
          color="light-cyan"
        >
          <template #icon>
            <HaWorldIcon />
          </template>
          <template #title>
            一般展示
          </template>
          <template #body>
            XR技術やクリエイティブ作品の展示を行うブースです。デモ体験やワークショップなど、来場者が参加できる企画も歓迎します。
          </template>
        </HaAboutCard>
      </div>
      <div class="card-flex__child">
        <HaAboutCard
          icon-url="/icons/boxicons_community.svg"
          color="light-magenta"
        >
          <template #icon>
            <HaCommunityIcon />
          </template>
          <template #title>
            企業出展
          </template>
          <template #body>
            企業・法人向けの出展ブースです。最新XRコンテンツの体験提供や、製品・サービスのプロモーションにご活用いただけます。
          </template>
        </HaAboutCard>
      </div>
    </div>
    <p class="subtitle">
      出展者向けリソース
    </p>
    <div
      ref="list2Ref"
      class="link-list"
    >
      <HaDocumentLink
        title="出展ガイドライン"
        label="important"
        color="green"
        text="出展に必要なルール・準備事項をまとめた公式ガイド"
        class="link-list__child"
        href="/documents/exhibition-guidline"
      >
        <template #icon>
          <HaOpenBookIcon />
        </template>
      </HaDocumentLink>
      <HaDocumentLink
        title="出展規約"
        label="required"
        color="cyan"
        text="出展者が遵守すべき規約・利用条件"
        class="link-list__child"
        href="/documents/exhibition-terms"
      >
        <template #icon>
          <HaBalanceIcon />
        </template>
      </HaDocumentLink>
      <HaDocumentLink
        title="出展ガイドライン"
        label="Q&A"
        color="magenta"
        text="出展に必要なルール・準備事項をまとめた公式ガイド"
        class="link-list__child"
        href="/documents/exhibition-guidline"
      >
        <template #icon>
          <HaCircledQuestionIcon />
        </template>
      </HaDocumentLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）

  @include m.sp {
    margin-bottom: 48px;
  }
}

.card-flex {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 330px));
  gap: 32px;
  justify-content: center;

  max-width: 1080px;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__child {
    @include m.tb {
      width: 60%;
      margin-right: auto;
      margin-left: auto;
    }

    @include m.sp {
      width: 100%;
    }
  }
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @include m.tb {
    align-items: center;
  }

  &__child {
    @include m.tb {
      width: 60%;
    }

    @include m.sp {
      width: 100%;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtQuickAccessSection.vue
```vue
<i18n lang="yaml">
ja:
  section:
    title: 参加者向け重要情報
    label: quick access
  cards:
    date:
      title: 開催日
      label: DATE
      body: 2026年9月26日(土)
    location:
      title: 会場
      label: LOCATION
      body:
        line1: アスティーホール
        line2: 札幌市中央区 北4条西5丁目1 4F
    tickets:
      title: チケット
      label: TICKETS
      body: 販売開始に向けて準備中です。
    schedule:
      title: スケジュール
      label: SCHEDULE
      body: 詳細タイムテーブルは順次公開予定です。
en:
  section:
    title: Key Information for Visitors
    label: quick access
  cards:
    date:
      title: Date
      label: DATE
      body: Sat, September 26, 2026
    location:
      title: Venue
      label: LOCATION
      body:
        line1: ASTY Hall
        line2: Kita 4-jo Nishi 5-chome 1, Chuo-ku, Sapporo, 4F
    tickets:
      title: Tickets
      label: TICKETS
      body: Ticket sales are being prepared.
    schedule:
      title: Schedule
      label: SCHEDULE
      body: The detailed timetable will be announced later.
</i18n>

<script setup lang="ts">
import HaQuickAccessCard from '../ha/HaQuickAccessCard.vue'
import HaCalendarIcon from '../ha/icons/HaCalendarIcon.vue'
import HaMapPinIcon from '../ha/icons/HaMapPinIcon.vue'
import HaTicketIcon from '../ha/icons/HaTicketIcon.vue'
import HaTimerIcon from '../ha/icons/HaTimerIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.gsap-list__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="t('section.title')"
      :label="t('section.label')"
    />
    <div
      ref="listRef"
      class="grid2x"
    >
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="cyan"
          :title="t('cards.date.title')"
          :label="t('cards.date.label')"
        >
          <template #icon>
            <HaCalendarIcon />
          </template>
          <template #body>
            <p>{{ t('cards.date.body') }}</p>
          </template>
        </HaQuickAccessCard>
      </div>
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="magenta"
          :title="t('cards.location.title')"
          :label="t('cards.location.label')"
        >
          <template #icon>
            <HaMapPinIcon />
          </template>
          <template #body>
            <p>
              {{ t('cards.location.body.line1') }}<br>
              {{ t('cards.location.body.line2') }}
            </p>
          </template>
        </HaQuickAccessCard>
      </div>
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="amber"
          :title="t('cards.tickets.title')"
          :label="t('cards.tickets.label')"
        >
          <template #icon>
            <HaTicketIcon />
          </template>
          <template #body>
            <p>{{ t('cards.tickets.body') }}</p>
          </template>
        </HaQuickAccessCard>
      </div>
      <div class="gsap-list__child grid2x__child">
        <HaQuickAccessCard
          color="vermilion"
          :title="t('cards.schedule.title')"
          :label="t('cards.schedule.label')"
          icon-url="/icons/material-symbols_timer-outline.svg"
        >
          <template #icon>
            <HaTimerIcon />
          </template>
          <template #body>
            <p>{{ t('cards.schedule.body') }}</p>
          </template>
        </HaQuickAccessCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as m;

.grid2x {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 20px;

  @include m.sp {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  &__child {
    height: 100%;
    min-height: 280px;
  }
}
</style>
```

## File: layers/main/app/components/ht/HtAboutSection.vue
```vue
<i18n lang="yaml">
ja:
  desc1: '「VketReal in 札幌」は、{br1}世界最大級のメタバースイベント「バーチャルマーケット」から派生した{br2}リアルイベントです。'
  desc2: 'VRSNS上で活躍する北海道ゆかりのクリエイターたちが、リアルの場に飛び出す場所をつくりたい―――{br}そんな想いから生まれた、有志主催のイベントです。北海道の有志XRクリエイターが主催し、札幌で開催します。'
  stat1Label: '過去の来場者数'
  stat1Unit: '名+'
  stat2Label: '出展サークル数'
  stat2Unit: '+'
  stat3Label: '開催回数'
  stat3Unit: '回'
  feature1Title: 'バーチャル姿のまま、{br}リアルで体験'
  feature1Desc: 'アバターとしての生き方を大切にする人々が{br}リアルの場で集い、交流し、共に{br}クリエイティブな未来を築く場です。'
  feature2Title: 'VRの世界で活躍する{br}クリエイターの出展'
  feature2Desc: 'VRとリアルを行き来しながら活躍する{br}クリエイターの作品展示や、新たなXR技術を{br}活用したインタラクティブな企画を展開！'
  feature3Title: '遊んで、買って、{br}楽しめる企業ブース'
  feature3Desc: '各企業ブースでは最新XRコンテンツを体験でき、{br}ここでしか手に入らない限定グッズも{br}販売されるかも？'
en:
  desc1: '"VketReal in Sapporo" is an in-person event inspired by "VirtualMarket (Vket)", one of the world''s largest events in the metaverse.'
  desc2: 'This is a community-run event, born from a simple idea: give creators from the Hokkaido VR/SNS scene a place to step into the real world. Organized by volunteer XR creators based in Hokkaido, and held in Sapporo.'
  stat1Label: 'Total Attendees'
  stat1Unit: '+'
  stat2Label: 'Exhibiting Circles'
  stat2Unit: '+'
  stat3Label: 'Events Held'
  stat3Unit: ''
  feature1Title: 'Experience the Event as Your Virtual Avatar'
  feature1Desc: 'A space where people who live as their avatars come together in the real world — to connect, create, and build a creative future.'
  feature2Title: 'Creators from the VR World, Exhibiting Live'
  feature2Desc: 'Discover works by creators who move between VR and the real world, alongside interactive experiences powered by the latest XR technology.'
  feature3Title: 'Explore, Shop, and Have Fun at Sponsor Booths'
  feature3Desc: 'Try out the latest XR content at each booth. You might even find limited-edition merchandise you can only get here.'
</i18n>

<script setup lang="ts">
import HaCard from '../ha/HaAboutCard.vue'
import HaCountUpNumber from '../ha/HaCountUpNumber.vue'
import HaCommunityIcon from '../ha/icons/HaCommunityIcon.vue'
import HaStarShineIcon from '../ha/icons/HaStarShineIcon.vue'
import HaWorldIcon from '../ha/icons/HaWorldIcon.vue'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const { t } = useI18n({ useScope: 'local' })
const { t: tGlobal } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const { fadeInUp, fadeInUpStagger } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)

  if (!listRef.value) return
  const items = listRef.value.querySelectorAll('.gsap-list__child')
  fadeInUpStagger(Array.from(items))
})
</script>

<template>
  <div ref="sectionRef">
    <HaSectionTitle
      :title="tGlobal('sectionTitle.about')"
      label="ABOUT"
    />
    <i18n-t
      keypath="desc1"
      tag="div"
      class="description description--space"
      scope="parent"
    >
      <template #br1>
        <br class="sp-none">
      </template>
      <template #br2>
        <br class="sp-none">
      </template>
    </i18n-t>
    <i18n-t
      keypath="desc2"
      tag="div"
      class="description"
      scope="parent"
    >
      <template #br>
        <br class="sp-none">
      </template>
    </i18n-t>
    <div class="info-flex mb-24">
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--amber">
          <HaCountUpNumber
            :value="500"
            :duration="2000"
          />{{ t('stat1Unit') }}
        </p>
        <p class="info-flex__label">
          {{ t('stat1Label') }}
        </p>
      </div>
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--cyan">
          <HaCountUpNumber
            :value="50"
            :duration="2000"
          />{{ t('stat2Unit') }}
        </p>
        <p class="info-flex__label">
          {{ t('stat2Label') }}
        </p>
      </div>
      <div class="info-flex__child">
        <p class="info-flex__number info-flex__number--magenta">
          <HaCountUpNumber
            :value="6"
            :duration="2000"
          />{{ t('stat3Unit') }}
        </p>
        <p class="info-flex__label">
          {{ t('stat3Label') }}
        </p>
      </div>
    </div>

    <div
      ref="listRef"
      class="card-flex"
    >
      <div class="gsap-list__child">
        <HaCard
          class="card-flex__child"
          color="amber"
        >
          <template #icon>
            <HaStarShineIcon />
          </template>
          <template #title>
            <i18n-t
              keypath="feature1Title"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
          <template #body>
            <i18n-t
              keypath="feature1Desc"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
        </HaCard>
      </div>
      <div class="gsap-list__child">
        <HaCard
          class="card-flex__child"
          color="cyan"
        >
          <template #icon>
            <HaWorldIcon />
          </template>
          <template #title>
            <i18n-t
              keypath="feature2Title"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
          <template #body>
            <i18n-t
              keypath="feature2Desc"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
        </HaCard>
      </div>
      <div class="gsap-list__child">
        <HaCard
          class="card-flex__child"
          color="light-magenta"
        >
          <template #icon>
            <HaCommunityIcon />
          </template>
          <template #title>
            <i18n-t
              keypath="feature3Title"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
          <template #body>
            <i18n-t
              keypath="feature3Desc"
              scope="parent"
            >
              <template #br>
                <br>
              </template>
            </i18n-t>
          </template>
        </HaCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.mb-24 {
  margin-bottom: 96px; // TODO: utilities.scssを作り、移植すべき。24...24rem（1rem=4pxの場合）

  @include m.tb {
    margin-bottom: 64px;
  }
}

.info-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    flex-direction: column;
    align-items: center;
  }

  &__child {
    width: 320px;
  }

  &__number {
    margin-bottom: 4px;

    font-size: 64px;
    font-weight: 700;
    line-height: 1em;
    text-align: center;
    letter-spacing: normal;
    white-space: nowrap;

    @include m.sp {
      margin-bottom: 8px;
      font-size: 48px;
    }

    &--cyan {
      color: v.$vket-cyan;
    }

    &--amber {
      color: v.$vket-amber;
    }

    &--magenta {
      color: v.$vket-magenta;
    }
  }

  &__label {
    font-size: 16px;
    font-weight: 400;
    color: v.$vket-emerald;
    text-align: center;

    @include m.sp {
      font-size: 10px;
    }
  }
}

.card-flex {
  display: flex;
  gap: 32px;
  justify-content: center;

  width: 100%;
  margin-right: auto;
  margin-left: auto;

  @include m.tb {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .gsap-list__child {
    width: 320px;

    @include m.tb {
      width: 60%;
    }

    @include m.sp {
      width: 100%;
    }
  }

  &__child {
    width: 100%;
    height: 100%;
  }
}
</style>
```

## File: layers/main/app/components/ht/HtNewsSection.vue
```vue
<script setup lang="ts">
import HmNewsSwiper from '../hm/HmNewsSwiper.vue'
import HaChevronLeftIcon from '../ha/icons/HaChevronLeftIcon.vue'
import HaChevronRightIcon from '../ha/icons/HaChevronRightIcon.vue'

// Swiper
import type { Swiper as SwiperType } from 'swiper'

// GSAP
import { useGsapFadeIn } from '~/composables/useGsapFadeIn'

const worksSwiperRef = ref<{ swiperInstance: SwiperType | null } | null>(null)

const isBeginning = ref(true)
const isEnd = ref(false)

const onSlideChange = (newIsBeginning: boolean, newIsEnd: boolean) => {
  isBeginning.value = newIsBeginning
  isEnd.value = newIsEnd
}

const { t: tGlobal } = useI18n()

const items = computed(() => [
  {
    id: 1,
    title: tGlobal('news.2.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: '/news1_thumbnail.png',
    timestamp: '2026-06-06',
  },
  {
    id: 2,
    title: tGlobal('news.2.title'),
    href: 'https://archived.vris.jp/',
    imgSrc: '/news2_thumbnail.png',
    timestamp: '2026-06-01',
  },
])

const sectionRef = ref<HTMLElement | null>(null)
const { fadeInUp } = useGsapFadeIn()

onMounted(() => {
  fadeInUp(sectionRef)
})
</script>

<template>
  <HaSectionTitle
    :title="tGlobal('sectionTitle.news')"
    label="NEWS"
  >
    <template #controls>
      <button
        :disabled="isBeginning"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isBeginning }"
        @click="worksSwiperRef?.swiperInstance?.slidePrev()"
      >
        <HaChevronLeftIcon />
      </button>
      <button
        :disabled="isEnd"
        class="custom-swiper-button"
        :class="{ 'is-disabled': isEnd }"
        @click="worksSwiperRef?.swiperInstance?.slideNext()"
      >
        <HaChevronRightIcon />
      </button>
    </template>
  </HaSectionTitle>
  <div ref="sectionRef">
    <HmNewsSwiper
      ref="worksSwiperRef"
      class="news__swiper"
      :items="items"
      :_slides-per-view="1"
      :_breakpoints="{
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      }"
      @slide-change="onSlideChange"
    />
    <NuxtLink
      class="glassy-button news__button"
      to="/news"
    >
      {{ tGlobal("viewAll") }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.news {
  &__swiper {
    margin-bottom: 36px;

    @include m.tb {
      margin-bottom: 24px;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 218px;
    height: 74px;
    margin: 0 auto;

    font-family: Inter, sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: white;

    background-color: #e5b5ff3b;

    @include m.tb {
      width: 198px;
      height: 64px;
    }
  }
}
</style>
```

## File: layers/main/app/components/ht/HtTop.vue
```vue
<i18n lang="yaml">
ja:
  hoge: ほげ
en:
  hoge: hoge
</i18n>

<template>
  <main class="ht-top content-wrapper">
    <div class="content-wrapper__sticky">
      <HtHeroSection />
    </div>

    <div class="content-wrapper__bg content-wrapper__scroll">
      <div class="canvas-wrapper">
        <HaConfetti />
        <HaFireworks />
      </div>

      <div class="content-wrapper__main">
        <section id="about">
          <HtAboutSection />
        </section>

        <section id="exhibitor-info">
          <HtExhibitorInfoSection />
        </section>

        <section id="participation-guide">
          <HtParticipationGuide />
        </section>

        <section id="news">
          <HtNewsSection />
        </section>

        <section id="contents">
          <HtContentsSection />
        </section>

        <section id="schedule">
          <HtScheduleSection />
        </section>

        <section id="location-info">
          <HtAccessSection />
        </section>

        <section id="sponsors-and-partners">
          <HtSponsorsAndPartnersSection />
        </section>

        <section id="qa">
          <HtQandASection />
        </section>

        <section id="contact">
          <HtContactSection />
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// import HtQuickAccessSection from './HtQuickAccessSection.vue'
// import HtCrowdLevelsSection from './HtCrowdLevelsSection.vue'
// import HtExhibitionSection from './HtExhibitionSection.vue'
// import HtCodeOfConductSection from './HtCodeOfConductSection.vue'
// import HtRelatedEventsSection from './HtRelatedEventsSection.vue'
// import HtTicketSection from './HtTicketSection.vue'
import HtHeroSection from './HtHeroSection.vue'
import HtAboutSection from './HtAboutSection.vue'
import HtExhibitorInfoSection from './HtExhibitorInfoSection.vue'
import HtNewsSection from './HtNewsSection.vue'
import HtContentsSection from './HtContentsSection.vue'
import HtAccessSection from './HtAccessSection.vue'
import HtScheduleSection from './HtScheduleSection.vue'
import HtSponsorsAndPartnersSection from './HtSponsorsAndPartnersSection.vue'
import HtQandASection from './HtQandASection.vue'
import HtContactSection from './HtContactSection.vue'

import HaFireworks from '../ha/HaFireworks.vue'
import HaConfetti from '../ha/HaConfetti.vue'
import HtParticipationGuide from './HtParticipationGuide.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;
@use '@/assets/styles/mixins' as m;

.ht-top {
  position: relative;
  z-index: 0;

  width: 100%;
  height: 100%;
  margin-bottom: -40px;
}

.content-wrapper {
  position: relative;

  &__sticky {
    position: sticky;
    z-index: -1;
    top: 0;
  }

  &__bg {
    padding-top: 124px;
    border-radius: 36px 36px 0 0;
    background-color: v.$base-background-color;

    @include m.sp {
      padding-top: 64px;
    }
  }

  &__main {
    position: relative;
    z-index: 2;
    max-width: 1600px;
    margin: 0 auto;
  }
}

.canvas-wrapper {
  pointer-events: none;

  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100svh;
  margin-bottom: -100svh;
}

section {
  padding: 0 136px 108px;

  &:first-of-type {
    padding-top: 24px;
  }

  @include m.tb {
    padding: 0 16px 84px;
  }
}

#contact {
  padding-bottom: 220px;

  @include m.tb {
    padding-bottom: 180px;
  }

  @include m.sp {
    padding-bottom: 124px;
  }
}
</style>
```
