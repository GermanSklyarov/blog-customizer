import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { FormEvent, MouseEvent, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	isOpen: boolean;
	onArrowClick: () => void;
	onSubmit: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onArrowClick,
	onSubmit,
}: TArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOptionChange = (option: string, value: OptionType) => {
		setFormState({ ...formState, [option]: value });
	};

	const handleArrowClick = (e: MouseEvent) => {
		e.stopPropagation();
		onArrowClick();
	};

	const handleAsideClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				onClick={handleAsideClick}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => handleOptionChange('fontFamilyOption', value)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) => handleOptionChange('fontSizeOption', value)}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => handleOptionChange('fontColor', value)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => handleOptionChange('backgroundColor', value)}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleOptionChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
