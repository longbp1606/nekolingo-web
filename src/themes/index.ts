const PRIMARY_COLOR: string = '#00C2D1';
const SECONDARY_COLOR: string = '#F9E900';
const TERTIARY_COLOR: string = '#ED33B9';
const QUATERNARY_COLOR: string = '#F6AF65';
const QUINARY_COLOR: string = '#0A1045';
const GREEN: string = '#58CC02';
const DARK_GREEN: string = '#4DAA02';
const BG_GREEN: string = '#D7FFB8';
const RED: string = '#FF4B4B';
const DARK_RED: string = '#E04343';
const BG_RED: string = '#FFDFE0';
const BG_BLUE: string = '#CCF2F5';
const LIGHT_ORANGE: string = '#FFD700';
const ORANGE: string = '#FFA500';
const LIGHT_PURPLE: string = '#AB47BC';
const DARK_PURPLE: string = '#9C27B0';
const DARK_PRIMARY: string = '#009EB2';
const TITLE: string = '#4B4B4B';
const DESCRIPTION: string = '#777';

export const theme = {
    light: '',
    dark: '',
    color: {
        primary: PRIMARY_COLOR,
        darkPrimary: DARK_PRIMARY,
        lightPrimary: '#CCF3F6',
        secondary: SECONDARY_COLOR,
        tertiary: TERTIARY_COLOR,
        quaternary: QUATERNARY_COLOR,
        quinary: QUINARY_COLOR,
        green: GREEN,
        darkGreen: DARK_GREEN,
        bgGreen: BG_GREEN,
        red: RED,
        darkRed: DARK_RED,
        bgRed: BG_RED,
        bgBlue: BG_BLUE,
        orange: ORANGE,
        lightOrange: LIGHT_ORANGE,
        lightPurple: LIGHT_PURPLE,
        darkPurple: DARK_PURPLE,
        title: TITLE,
        description: DESCRIPTION,
        google: '#DB4437',
        facebook: '#1877F2',
        info: '#1677FF',
        warning: '#FAAD14',
        success: '#52C41A',
        error: '#FF0000',
        grey: '#CCC',
        yellow: '#FFCE3D',
        blue: '#1a73e8',
        border: '#BFBFBF',
        textPrimary: 'rgba(0, 0, 0, 0.85)',
        textSecondary: 'rgba(0, 0, 0, 0.45)',
        textTertiary: '#BCBCBC',
        textQuaternary: '#566363',
        disabledPlaceholder: 'rgba(0, 0, 0, 0.25)',
        divider: 'rgba(5, 5, 5, 0.06)',
        hoverPrimary: 'rgba(240,81,35,.1)',
        hoverSecondary: '#F1F1F1',
        white: '#FFF',
        black: '#000',
        shadowForm: 'rgb(34 41 47 / 10%)',
        shadowCart: 'rgba(56, 56, 56, 0.06)',
        shadowDropdown: 'rgba(0, 0, 0, 0.02)',
        shadowCartHover: 'rgba(56, 56, 56, 0.07)',
        shadowPurchased: 'rgba(51, 56, 56, 0.06)',
        shadowPurchasedHover: 'rgba(51, 56, 56, 0.07)',
        shadowButton: 'rgba(0, 0, 0, 0.04)',
        overlayImage: 'rgba(106, 111, 119, 0.1)',
        borderDefault: '#E5E5E5',
        borderInput: '#D9D9D9',
        borderNextButton: '#349fa7',
        starIcon: '#FADB14',
        descTabBorder: '#F0F0F0',
        done: '#1BC47D',
        doneBackground: '#A6E8CC',
        processing: '#FFC700',
        processingBackground: '#FFE99B',
        incoming: '#FF9500',
        incomingBackground: '#FFD59B',
        cancel: '#FF2942',
        cancelBackground: '#FFABB5',
        pending: '#BFBFBF',
        pendingBackground: '#E6E6E6',
        borderSchedule: '#E5E5E5',
        toolbarBg: '#F5F5F5',
        adminBackground: '#f8f9fa',
    },
    transition: {
        primary: 'all 0.25s linear',
    }
}

export const AntdThemeConfig = {
    token: {
        colorPrimary: PRIMARY_COLOR,
        colorSecondary: SECONDARY_COLOR,
        colorLink: PRIMARY_COLOR,
        fontFamily: 'Quicksand',
        colorLinkHover: PRIMARY_COLOR,
    },
};