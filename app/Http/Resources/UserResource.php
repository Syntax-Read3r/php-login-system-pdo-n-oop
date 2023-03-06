<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
    
            $date_string = '2022-03-01 10:30:00';
            $datetime = new DateTime($date_string);
            $formattedCreatedAt = $datetime->format('Y-m-d H:i:s');
    
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'create_at' => $this->$formattedCreatedAt,
        ];
    }
    
}
