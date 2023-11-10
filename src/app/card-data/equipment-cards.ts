export interface Equipment {
	id: EquipmentId;
	title: string;
	description: string;
	cost: number;
	usable: boolean;
	requirements?: {
		magic?: number;
		combat?: number;
		stealth?: number;
		tech?: number;
	};
}

export enum EquipmentId {
	BULLETPROOF_VEST = 'bulletproof-vest',
	BLOOD_AMULET = 'blood-amulet',
	RABBITS_FOOT = 'rabbits-foot',
	KINETIC_TRANSFER_JACKET = 'kinetic-transfer-jacket',
	BULWARK = 'bulwark',
	OCULAR_IMPLANTS = 'ocular-implants',
	SPARE_CLIP = 'spare-clip',
}

export const equipment: Equipment[] = [
	{
		id: EquipmentId.BLOOD_AMULET,
		title: 'Blood Amulet',
		description: 'During an encounter, you may lose 1 Health and then count your missing Health toward the encounter.',
		cost: 5,
		usable: true,
		requirements: {
			magic: 2,
		},
	},
	{
		id: EquipmentId.RABBITS_FOOT,
		title: "Rabbit's Foot",
		description: 'Select two rewards during a Loot phase.',
		cost: 2,
		usable: false,
	},
	{
		id: EquipmentId.KINETIC_TRANSFER_JACKET,
		title: 'Kinetic Transfer Jacket',
		description: 'Any time you would lose exactly 1 Health, gain 1 Health instead.',
		cost: 4,
		usable: false,
		requirements: {
			tech: 3,
			combat: 2,
		},
	},
	{
		id: EquipmentId.BULWARK,
		title: 'Bulwark',
		description:
			'You may only play a max of 3 cards on an encounter. Any time you take damage, reduce the damage by 3.',
		cost: 3,
		usable: false,
		requirements: {
			combat: 3,
		},
	},
	{
		id: EquipmentId.OCULAR_IMPLANTS,
		title: 'Binoculars',
		description: 'Reveal all adjacent squares whenever you move into a square.',
		cost: 3,
		usable: false,
		requirements: {
			tech: 1,
		},
	},
	{
		id: EquipmentId.SPARE_CLIP,
		title: 'Spare Clip',
		description:
			'During an encounter, you may use this to redraw all combat cards in your hand and the encounter stage.',
		cost: 2,
		usable: true,
		requirements: {
			combat: 3,
		},
	},
	{
		id: EquipmentId.BULLETPROOF_VEST,
		title: 'Bulletproof Vest',
		description: 'When you would take fatal damage, reduce your health to 1 instead. Destroy.',
		cost: 2,
		usable: false,
		requirements: {
			combat: 2,
		},
	},
	{
		id: EquipmentId.,
		title: 'Full Auto',
		description:
			'All combat cards have their encounter value multiplied by 2 when played during an encounter. The Alert Level increases by an additional point each turn.',
		cost: 3,
		usable: false,
		requirements: {
			combat: 4
		}
	},
];

// IDEAS:

// Stealth shoes that allow extra movement point. Don't count towards equipment total.
