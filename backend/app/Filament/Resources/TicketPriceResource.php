<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TicketPriceResource\Pages;
use App\Filament\Resources\TicketPriceResource\RelationManagers;
use App\Models\TicketPrice;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TicketPriceResource extends Resource
{
    protected static ?string $model = TicketPrice::class;

    protected static ?string $navigationGroup = 'Informasi Kunjungan';
    protected static ?string $navigationLabel = 'Tarif Tiket Masuk';
    protected static ?string $modelLabel = 'Tarif Tiket';
    protected static ?string $pluralModelLabel = 'Tarif Tiket';
    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('visitor_type')
                    ->required(),
                Forms\Components\TextInput::make('weekday_price')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('weekend_price')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('status')
                    ->required(),
                Forms\Components\DatePicker::make('effective_until'),
                Forms\Components\TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('visitor_type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('weekday_price')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('weekend_price')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->searchable(),
                Tables\Columns\TextColumn::make('effective_until')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTicketPrices::route('/'),
            'create' => Pages\CreateTicketPrice::route('/create'),
            'edit' => Pages\EditTicketPrice::route('/{record}/edit'),
        ];
    }
}
