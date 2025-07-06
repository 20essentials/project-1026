import { useState } from 'react';
import SmokeyCursor from '@/components/lightswind/smokey-cursor';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/lightswind/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/lightswind/tabs';
import { Label } from '@/components/lightswind/label';
import { Slider } from '@/components/lightswind/slider';

import { Button } from '@/components/lightswind/button';

export function SmokeyCursorDemo() {
  const [settings, setSettings] = useState({
    simResolution: 128,
    dyeResolution: 1024,
    densityDissipation: 3.5,
    velocityDissipation: 2,
    pressure: 0.1,
    pressureIterations: 20,
    curl: 3,
    splatRadius: 0.2,
    splatForce: 6000,
    shading: true,
    colorUpdateSpeed: 10,
    backColor: { r: 0.5, g: 0, b: 0 },
    transparent: true,
    isActive: true
  });

  const toggleCursor = () => {
    setSettings(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const handleColorChange = (component: 'r' | 'g' | 'b', value: number) => {
    setSettings(prev => ({
      ...prev,
      backColor: {
        ...prev.backColor,
        [component]: value / 100
      }
    }));
  };

  const handleSliderChange = (name: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='space-y-8'>
      <div className='absolute w-full h-[300px] rounded-lg overflow-hidden  flex items-center justify-center'>
        <div className='z-10 text-center hidden'>
          <h3 className='text-2xl font-medium mb-4 text-red'>Mouse Fluid Simulation</h3>
          <Button
            onClick={toggleCursor}
            className='animate-pulse'
            variant={settings.isActive ? 'destructive' : 'default'}
          >
            {settings.isActive ? 'Deactivate Effect' : 'Activate Effect'}
          </Button>
        </div>
        {settings.isActive && (
          <SmokeyCursor
            SIM_RESOLUTION={settings.simResolution}
            DYE_RESOLUTION={settings.dyeResolution}
            DENSITY_DISSIPATION={settings.densityDissipation}
            VELOCITY_DISSIPATION={settings.velocityDissipation}
            PRESSURE={settings.pressure}
            PRESSURE_ITERATIONS={settings.pressureIterations}
            CURL={settings.curl}
            SPLAT_RADIUS={settings.splatRadius}
            SPLAT_FORCE={settings.splatForce}
            SHADING={settings.shading}
            COLOR_UPDATE_SPEED={settings.colorUpdateSpeed}
            BACK_COLOR={settings.backColor}
            TRANSPARENT={settings.transparent}
          />
        )}
      </div>

      <Tabs defaultValue='basic' className='w-full hidden'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='basic'>Basic Settings</TabsTrigger>
          <TabsTrigger value='advanced'>Advanced Settings</TabsTrigger>
          <TabsTrigger value='presets'>Presets</TabsTrigger>
        </TabsList>

        <TabsContent value='basic' className='space-y-4 '>
          {/* Basic Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
              <CardDescription>
                Adjust the fluid dynamics behavior
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Density Dissipation */}
                <div className='space-y-2'>
                  <Label>
                    Density Dissipation: {settings.densityDissipation.toFixed(1)}
                  </Label>
                  <Slider
                    value={[settings.densityDissipation]}
                    min={1}
                    max={5}
                    step={0.1}
                    onValueChange={value =>
                      handleSliderChange('densityDissipation', value[0])
                    }
                  />
                </div>

                {/* Velocity Dissipation */}
                <div className='space-y-2'>
                  <Label>
                    Velocity Dissipation:{' '}
                    {settings.velocityDissipation.toFixed(1)}
                  </Label>
                  <Slider
                    value={[settings.velocityDissipation]}
                    min={0.5}
                    max={4}
                    step={0.1}
                    onValueChange={value =>
                      handleSliderChange('velocityDissipation', value[0])
                    }
                  />
                </div>

                {/* Splat Radius */}
                <div className='space-y-2'>
                  <Label>Splat Radius: {settings.splatRadius.toFixed(2)}</Label>
                  <Slider
                    value={[settings.splatRadius]}
                    min={0.1}
                    max={0.5}
                    step={0.01}
                    onValueChange={value =>
                      handleSliderChange('splatRadius', value[0])
                    }
                  />
                </div>

                {/* Splat Force */}
                <div className='space-y-2'>
                  <Label>Splat Force: {settings.splatForce}</Label>
                  <Slider
                    value={[settings.splatForce]}
                    min={1000}
                    max={10000}
                    step={100}
                    onValueChange={value =>
                      handleSliderChange('splatForce', value[0])
                    }
                  />
                </div>
              </div>

              {/* Color Sliders */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {['r', 'g', 'b'].map(comp => (
                  <div className='space-y-2' key={comp}>
                    <Label>
                      {comp.toUpperCase()}:{' '}
                      {Math.round(
                        settings.backColor[comp as 'r' | 'g' | 'b'] * 100
                      )}
                      %
                    </Label>
                    <Slider
                      value={[settings.backColor[comp as 'r' | 'g' | 'b'] * 100]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={value =>
                        handleColorChange(comp as 'r' | 'g' | 'b', value[0])
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Continúa el resto de tabs aquí... */}
      </Tabs>
    </div>
  );
}
