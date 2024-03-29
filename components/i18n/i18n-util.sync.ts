// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters'
import type { Locales, Translations } from './i18n-types'
import { loadedFormatters, loadedLocales, locales } from './i18n-util'

import es_AR from './es-AR';
import es_MX from './es-MX';
import en_US from './en-US';
import en_CA from './en-CA';
import en_GB from './en-GB';
import zh_CN from './zh-CN';
import ru_RU from './ru-RU';
import fr_FR from './fr-FR';
import fr_CA from './fr-CA';
import de_DE from './de-DE';
import it_IT from './it-IT';
import ar_SA from './ar-SA';

const localeTranslations = {
  'es-AR': es_AR,
  'es-MX': es_MX,
  'en-US': en_US,
  'en-CA': en_CA,
  'en-GB': en_GB,
	'zh-CN': zh_CN,
	'ru-RU': ru_RU,
	'fr-FR': fr_FR,
	'fr-CA': fr_CA,
	'de-DE': de_DE,
	'it-IT': it_IT,
	'ar-SA': ar_SA
}


export const loadLocale = (locale: Locales): void => {
	if (loadedLocales[locale]) return

	loadedLocales[locale] = localeTranslations[locale] as unknown as Translations
	loadFormatters(locale)
}

export const loadAllLocales = (): void => locales.forEach(loadLocale)

export const loadFormatters = (locale: Locales): void =>
	void (loadedFormatters[locale] = initFormatters(locale))
