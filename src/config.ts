import InstanceSkel = require('../../../instance_skel')
import { SomeCompanionConfigField } from '../../../instance_skel_types'
import { ALL_MODEL_CHOICES } from './models'

export const fadeFpsDefault = 10

export enum PresetStyleName {
	Short = 0,
	Long = 1,
}

export interface AtemConfig {
	host?: string
	modelID?: string
	presets?: string
	fadeFps?: number
}

export function GetConfigFields(self: InstanceSkel<AtemConfig>): SomeCompanionConfigField[] {
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value:
				'This works with all models of Blackmagic Design ATEM mixers. <br />' +
				'Firmware versions 7.2 and 7.5.2 - 8.6.0 are known to work, other versions may experience problems. <br />' +
				"In general the model can be left in 'Auto Detect', however a specific model can be selected below for offline programming. <br />" +
				'Devices must be controlled over a network, USB control is NOT supported.',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			regex: self.REGEX_IP,
		},
		{
			type: 'dropdown',
			id: 'modelID',
			label: 'Model',
			width: 6,
			choices: ALL_MODEL_CHOICES,
			default: 0,
		},
		{
			type: 'dropdown',
			id: 'presets',
			label: 'Preset Style',
			width: 6,
			choices: [
				{ id: PresetStyleName.Short, label: 'Short Names' },
				{ id: PresetStyleName.Long, label: 'Long Names' },
			],
			default: PresetStyleName.Short,
		},
		{
			type: 'number',
			id: 'fadeFps',
			label: 'Framerate for fades',
			tooltip: 'Higher is smoother, but has higher impact on system performance',
			width: 6,
			min: 5,
			max: 60,
			step: 1,
			default: fadeFpsDefault,
		},
	]
}
