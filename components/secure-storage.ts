import * as Localization from 'expo-localization'
import * as SecureStore from 'expo-secure-store';
import { Locales } from './i18n/i18n-types';
import { baseLocale, isLocale } from './i18n/i18n-util';
import { countries } from '@/constants/countries'

const LOCALE_KEY = 'user_locale';
const CURRENCY_KEY = 'user_currency'


// Get default locale from device settings.
// If device locale is part of locales we support, use the locale from setting.
// Otherwise, set us as 'english'
export const DEFAULT_LOCALE: Locales = (Localization.locale?? baseLocale) as Locales;
// Set Country code. If locale from setting is part of Locales we support, use country code from deveice setting
// Otherise, set country code to 'US'
export const DEFAULT_COUNTRY_CODE = DEFAULT_LOCALE.split('-')[1];

export const DEFAULT_CURRENCY_CODE = countries[DEFAULT_COUNTRY_CODE].currency_code;
/**
 * Gets the locale, previous stored into local storage.
 * 
 * Returns the locale that was stored, or the passed-in default if none was stored.
 */
export const getUserLocale = async () => {
	try {
		const value = await SecureStore.getItemAsync(LOCALE_KEY)
		if (value !== null && isLocale(value)) {
			return value;
		}
	} catch(e) {
		console.error('Error reading from local storage', e);
	}

	return DEFAULT_LOCALE;
}

/**
 * Sets a locale into local storage.
 * 
 * Returns the locale back if it was stored successfully, or rejects the promise if not.
 */
export const setUserLocale = async (value: Locales) => {
	try {
		await SecureStore.setItemAsync(LOCALE_KEY, value)
		return value
	} catch (e) {
		console.error('Error reading from local storage', e);
		throw e;
	}
}

/**
 * Gets the country, previous stored into local storage.
 * 
 * Returns the country that was stored, or the passed-in default if none was stored.
 */
export const getUserCurrency = async () => {
	try {
		const value = await SecureStore.getItemAsync(CURRENCY_KEY)
		if (value !== null) {
			return value;
		}
	} catch(e) {
		console.error('Error reading from local storage', e);
	}

	return DEFAULT_CURRENCY_CODE
}

/**
 * Sets a country into local storage.
 * 
 * Returns the country back if it was stored successfully, or rejects the promise if not.
 */
export const setUserCurrency = async (value: string) => {
	try {
		await SecureStore.setItemAsync(CURRENCY_KEY, value)
		return value
	} catch (e) {
		console.error('Error reading from local storage', e);
		throw e;
	}
}
