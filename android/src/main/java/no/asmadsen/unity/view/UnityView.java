package no.asmadsen.unity.view;

import android.content.Context;
import android.content.res.Configuration;
import android.widget.FrameLayout;

public class UnityView extends FrameLayout {

    private NoKilledUnityPlayer view;

    protected UnityView(Context context) {
        super(context);
    }

    public void setUnityPlayer(NoKilledUnityPlayer player) {
        this.view = player;
        UnityUtils.addUnityViewToGroup(this);
    }

    @Override
    public void onWindowFocusChanged(boolean hasWindowFocus) {
        super.onWindowFocusChanged(hasWindowFocus);
        if (view != null) {
            view.windowFocusChanged(hasWindowFocus);
        }
    }

    @Override
    protected void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (view != null) {
            view.configurationChanged(newConfig);
        }
    }

    @Override
    protected void onDetachedFromWindow() {
        UnityUtils.addUnityViewToBackground();
        super.onDetachedFromWindow();
    }
}
